import {
  Address,
  applyParamsToScript,
  fromText,
  Data,
  Lucid,
  MintingPolicy,
  paymentCredentialOf,
  PolicyId,
  ScriptHash,
  SpendingValidator,
  toUnit,
  TxHash,
  UTxO,
  Assets,
  assetsToValue,
} from 'lucid-cardano'
import * as D from './types'
import scripts from './plutus.json'
import { fromAddress, toAddress } from '.'
import { Network } from '../types'

const presalanoScript = scripts.validators.find(
  (v) => v.title === 'presalano.spend'
)

function sumAssets(...assets: Assets[]) {
  return assets.reduce((a, b) => {
    for (const k in b) {
      if (b.hasOwnProperty(k)) {
        a[k] = (a[k] || 0n) + b[k]
      }
    }
    return a
  }, {})
}

const PROTOCOL_FUND_ADDRESS_TESTNET =
  'addr_test1qqrud8a7jnduha4f99ganq7dlk8m3tcv7qlrs20cxeshd6rgesj0ukzmm3jafyz4cgke50qpee02kak4nsewxlnj42jq03m6w9'

const PROTOCOL_FUND_ADDRESS_MAINNET =
  'addr1qyrud8a7jnduha4f99ganq7dlk8m3tcv7qlrs20cxeshd6rgesj0ukzmm3jafyz4cgke50qpee02kak4nsewxlnj42jqv8x6z6'

export class PresaleContract {
  lucid: Lucid
  tradeValidator: SpendingValidator
  tradeHash: ScriptHash
  tradeAddress: Address
  contributePolicy: MintingPolicy
  contributePolicyId: PolicyId
  config: D.ContractConfig

  constructor(lucid: Lucid, config: D.ContractConfig) {
    this.lucid = lucid
    this.config = config

    const policyId = this.config.policyId
    const assetName = fromText(this.config.assetName)
    const PROTOCOL_FUND_ADDRESS =
      this.config.network !== Network.Mainnet
        ? PROTOCOL_FUND_ADDRESS_TESTNET
        : PROTOCOL_FUND_ADDRESS_MAINNET

    const protocolKey = this.lucid.utils.getAddressDetails(
      PROTOCOL_FUND_ADDRESS
    ).paymentCredential?.hash!

    if (!protocolKey) throw 'Invalid protocol key!'

    this.tradeValidator = {
      type: 'PlutusV2',
      script: applyParamsToScript<D.TradeParams>(
        presalanoScript!.compiledCode,
        [protocolKey, { policyId, assetName }],
        D.TradeParams
      ),
    }

    this.tradeHash = lucid.utils.validatorToScriptHash(this.tradeValidator)
    this.tradeAddress = lucid.utils.credentialToAddress(
      lucid.utils.scriptHashToCredential(this.tradeHash)
    )

    this.contributePolicy = lucid.utils.nativeScriptFromJson({
      type: 'any',
      scripts: [
        { type: 'after', slot: 0 },
        { type: 'sig', keyHash: this.tradeHash },
      ],
    })
    this.contributePolicyId = lucid.utils.mintingPolicyToId(
      this.contributePolicy
    )
  }

  async deployScripts(supply: bigint): Promise<TxHash> {
    if (!this.config.owner) {
      throw new Error('No owner specified. Specify an owner in the config.')
    }

    const credential = paymentCredentialOf(this.config.owner)

    if (credential.type !== 'Key') {
      throw new Error('Owner needs to be a public key address.')
    }

    const tradeDatum: D.TradeDatum = {
      Listing: [
        {
          owner: fromAddress(this.config.owner),
          token_per_lovelace: 1n,
        },
      ],
    }

    const tx = await this.lucid
      .newTx()
      .payToContract(
        this.tradeAddress,
        {
          inline: Data.to<D.TradeDatum>(tradeDatum, D.TradeDatum),
        },
        { [this.config.policyId + fromText(this.config.assetName)]: supply }
      )
      .complete()

    const txSigned = await tx.sign().complete()
    return txSigned.submit()
  }

  async getDeployedScripts(): Promise<{ trade: UTxO | null }> {
    if (!this.config.deployHash) return { trade: null }
    const [trade] = await this.lucid.utxosByOutRef([
      {
        txHash: this.config.deployHash,
        outputIndex: 0,
      },
    ])
    return { trade }
  }

  /** Return the current listings for a specific asset sorted in ascending order by price. */
  async getListings(): Promise<UTxO[]> {
    return (
      await this.lucid.utxosAtWithUnit(
        paymentCredentialOf(this.tradeAddress),
        toUnit(this.config.policyId, fromText(this.config.assetName))
      )
    ).filter((utxo) => {
      const units = Object.keys(utxo.assets).filter(
        (unit) => unit !== 'lovelace'
      )
      return (
        units.every((unit) => unit.startsWith(this.config.policyId)) &&
        units.length >= 1
      )
    })
  }

  async contribute(
    contribute_amount: number,
    token_per_lovelace: number,
    utxo: UTxO
  ) {
    const tradeDatum = await this.lucid.datumOf<D.TradeDatum>(
      utxo,
      D.TradeDatum
    )

    if (!('Listing' in tradeDatum)) {
      throw new Error('Not a listing UTxO')
    }

    const listingDetails = tradeDatum.Listing[0]

    const owner = toAddress(listingDetails.owner, this.lucid)

    if (!this.config.owner) {
      throw new Error('No owner specified. Specify an owner in the config.')
    }

    const policyId = this.config.policyId
    const assetName = fromText(this.config.assetName)
    let balance = 0

    try {
      let val = assetsToValue(utxo.assets).to_js_value().multiasset[policyId][
        assetName
      ]
      balance = parseFloat(val)
    } catch (e) {
      throw 'Asset not available'
    }

    const token_acceptable_amount = contribute_amount * token_per_lovelace

    if (balance < token_acceptable_amount) {
      throw new Error('Reduce your contribution amount')
    }

    const paymentDatum = Data.to<D.PaymentDatum>(
      {
        outRef: {
          txHash: { hash: utxo.txHash },
          outputIndex: BigInt(utxo.outputIndex),
        },
      },
      D.PaymentDatum
    )

    const tx = await this.lucid
      .newTx()
      .collectFrom([utxo], Data.to<D.TradeAction>('Contribute', D.TradeAction))
      .payToAddressWithData(
        owner,
        {
          inline: paymentDatum,
        },
        { lovelace: BigInt(contribute_amount * 1000000) }
      )
      .payToContract(
        this.tradeAddress,
        {
          inline: Data.to<D.TradeDatum>(tradeDatum, D.TradeDatum),
        },
        {
          [this.config.policyId + fromText(this.config.assetName)]: BigInt(
            balance - token_acceptable_amount
          ),
        }
      )
      .attachSpendingValidator(this.tradeValidator)
      .complete()

    const txSigned = await tx.sign().complete()
    return txSigned.submit()
  }

  async finalize(utxo: UTxO) {
    const PROTOCOL_FUND_ADDRESS =
      this.config.network !== Network.Mainnet
        ? PROTOCOL_FUND_ADDRESS_TESTNET
        : PROTOCOL_FUND_ADDRESS_MAINNET

    const tradeDatum = await this.lucid.datumOf<D.TradeDatum>(
      utxo,
      D.TradeDatum
    )

    if (!('Listing' in tradeDatum)) {
      throw new Error('Not a listing UTxO')
    }

    const listingDetails = tradeDatum.Listing[0]

    const owner = toAddress(listingDetails.owner, this.lucid)
    const ownerCredential = paymentCredentialOf(owner)

    const address: Address = await this.lucid.wallet.address()
    const addressCredential = paymentCredentialOf(address)

    if (
      ownerCredential.type === 'Key' &&
      ownerCredential.hash !== addressCredential.hash
    ) {
      throw new Error('You are not the owner.')
    }

    const tx = await this.lucid
      .newTx()

      .collectFrom([utxo], Data.to<D.TradeAction>('Finalize', D.TradeAction))
      .compose(
        ownerCredential.type === 'Key'
          ? this.lucid.newTx().addSignerKey(ownerCredential.hash)
          : null
      )
      .compose(
        this.lucid.newTx().payToAddress(PROTOCOL_FUND_ADDRESS, {
          lovelace: BigInt(10 * 1000000),
        })
      )
      .attachSpendingValidator(this.tradeValidator)
      .complete()

    const txSigned = await tx.sign().complete()
    return txSigned.submit()
  }
}
