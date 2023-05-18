import {
  Address,
  applyParamsToScript,
  Assets,
  Data,
  Datum,
  fromText,
  fromUnit,
  Lovelace,
  Lucid,
  MintingPolicy,
  OutRef,
  paymentCredentialOf,
  PolicyId,
  ScriptHash,
  SpendingValidator,
  toUnit,
  Tx,
  TxHash,
  Unit,
  UTxO,
} from 'lucid-cardano';
import { ContractConfig } from './types';
import * as D from './types/contract';
import { fromAddress } from './utils';
import scripts from './presalano/plutus.json';

const presalanoScript = scripts.validators.find(
  (v) => v.title === 'presalano.spend'
);

const PROTOCOL_FUND_ADDRESS =
  'addr1vxuj4yyqlz0k9er5geeepx0awh2t6kkes0nyp429hsttt3qrnucsx';

export class Contract {
  lucid: Lucid;
  tradeValidator: SpendingValidator;
  tradeHash: ScriptHash;
  tradeAddress: Address;
  contributePolicy: MintingPolicy;
  contributePolicyId: PolicyId;
  presaleTokenPolicyId: PolicyId;
  config: ContractConfig;

  constructor(lucid: Lucid, config: ContractConfig) {
    this.lucid = lucid;
    this.config = config;

    const { policyId, assetName } = fromUnit(this.config.presaleToken);

    const protocolKey = this.lucid.utils.getAddressDetails(
      PROTOCOL_FUND_ADDRESS
    ).paymentCredential?.hash!;

    if (!protocolKey) throw 'Invalid protocol key!';

    this.tradeValidator = {
      type: 'PlutusV2',
      script: applyParamsToScript<D.TradeParams>(
        presalanoScript.compiledCode,
        [
          protocolKey,
          { policyId, assetName: assetName || '' },
          this.config.token_per_lovelace,
        ],
        D.TradeParams
      ),
    };

    this.tradeHash = lucid.utils.validatorToScriptHash(this.tradeValidator);
    this.tradeAddress = lucid.utils.credentialToAddress(
      lucid.utils.scriptHashToCredential(this.tradeHash)
    );

    this.contributePolicy = lucid.utils.nativeScriptFromJson({
      type: 'any',
      scripts: [
        { type: 'after', slot: 0 },
        { type: 'sig', keyHash: this.tradeHash },
      ],
    });
    this.contributePolicyId = lucid.utils.mintingPolicyToId(
      this.contributePolicy
    );
  }

  /** Deploy necessary scripts to reduce tx costs heavily. */
  async deployScripts(supply: bigint): Promise<TxHash> {
    const { policyId, assetName } = fromUnit(this.config.presaleToken);

    if (!this.config.owner) {
      throw new Error('No owner specified. Specify an owner in the config.');
    }
    const credential = paymentCredentialOf(this.config.owner);
    if (credential.type !== 'Key') {
      throw new Error('Owner needs to be a public key address.');
    }
    const ownerScript = this.lucid.utils.nativeScriptFromJson({
      type: 'sig',
      keyHash: credential.hash,
    });

    const ownerAddress = this.lucid.utils.validatorToAddress(ownerScript);

    const tx = await this.lucid
      .newTx()
      .payToAddressWithData(
        ownerAddress,
        {
          scriptRef: this.tradeValidator,
        },
        {}
      )
      .payToContract(
        this.tradeAddress,
        {},
        { [policyId + fromText(assetName)]: supply }
      )
      .complete();

    const txSigned = await tx.sign().complete();

    console.log('\n⛓ Deploy Tx Hash:', txSigned.toHash());
    console.log('You can now paste the Tx Hash into the Contract config.\n');

    return txSigned.submit();
  }

  async getDeployedScripts(): Promise<{ trade: UTxO | null }> {
    if (!this.config.deployHash) return { trade: null };
    const [trade] = await this.lucid.utxosByOutRef([
      {
        txHash: this.config.deployHash,
        outputIndex: 0,
      },
    ]);
    return { trade };
  }

  /** Return the current listings for a specific asset sorted in ascending order by price. */
  async getListings(assetName: string): Promise<UTxO[]> {
    return (
      await this.lucid.utxosAtWithUnit(
        paymentCredentialOf(this.tradeAddress),
        toUnit(this.config.policyId, assetName)
      )
    ).filter((utxo) => {
      const units = Object.keys(utxo.assets).filter(
        (unit) => unit !== 'lovelace'
      );
      return (
        units.every((unit) => unit.startsWith(this.config.policyId)) &&
        units.length >= 1
      );
    });
  }

  async _contribute(listingUtxo: UTxO): Promise<Tx> {
    const tradeDatum = await this.lucid.datumOf<D.TradeDatum>(
      listingUtxo,
      D.TradeDatum
    );
    if (!('Listing' in tradeDatum)) {
      throw new Error('Not a listing UTxO');
    }

    const owner: Address = toAddress(tradeDatum.Listing[0].owner, this.lucid);
    const requestedLovelace: Lovelace = tradeDatum.Listing[0].requestedLovelace;
    const privateListing = tradeDatum.Listing[0].privateListing;

    const paymentDatum = Data.to<D.PaymentDatum>(
      {
        outRef: {
          txHash: { hash: listingUtxo.txHash },
          outputIndex: BigInt(listingUtxo.outputIndex),
        },
      },
      D.PaymentDatum
    );

    const refScripts = await this.getDeployedScripts();

    return this.lucid
      .newTx()
      .collectFrom(
        [listingUtxo],
        Data.to<D.TradeAction>('Contribute', D.TradeAction)
      )
      .compose(
        await (async () => {
          const { tx, remainingLovelace } = await this._payFee(
            requestedLovelace,
            paymentDatum
          );
          return tx.payToAddressWithData(
            owner,
            { inline: paymentDatum },
            {
              lovelace: remainingLovelace,
            }
          );
        })()
      )
      .compose(this._payFeeAggregator(requestedLovelace))
      .compose(
        privateListing
          ? this.lucid.newTx().addSigner(toAddress(privateListing!, this.lucid))
          : null
      )
      .compose(
        refScripts.trade
          ? this.lucid.newTx().readFrom([refScripts.trade])
          : this.lucid.newTx().attachSpendingValidator(this.tradeValidator)
      );
  }
}
