use aiken/hash.{Blake2b_224, Hash}
use aiken/transaction.{OutputReference}
use aiken/transaction/credential.{Address, VerificationKey}
use aiken/transaction/value.{AssetName, PolicyId, Value}

pub type PublicKeyHash =
  Hash<Blake2b_224, VerificationKey>

pub type Script =
  ByteArray

pub type ScriptHash =
  Hash<Blake2b_224, Script>

pub type TraitOption {
  Included(ByteArray)
  Excluded(ByteArray)
}

pub type PresaleToken {
  policy_id: PolicyId,
  asset_name: AssetName,
}

pub type ListingDetails {
  owner: Address,
  token_per_lovelace: Int,
}

pub type BidOption {
  SpecificValue(Value)
  SpecificPolicyIdWithConstraints(
    PolicyId,
    List<ByteArray>,
    Option<List<TraitOption>>,
  )
}

pub type ContributeDetails {
  owner: Address,
  requested_option: BidOption,
}

pub type TradeDatum {
  Listing(ListingDetails)
}

pub type TradeAction {
  Contribute
  Finalize
}

pub type PaymentDatum {
  output_reference: OutputReference,
}
