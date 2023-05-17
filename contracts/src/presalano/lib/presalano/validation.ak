use aiken/list
use aiken/transaction.{Transaction}
use aiken/transaction/value
use aiken/transaction/credential.{VerificationKeyCredential}
use presalano/types.{PublicKeyHash, PaymentDatum, ListingDetails, PresaleToken}
use presalano/utils.{value_paid_to_with_datum}

pub fn paid_protocol(
  tx: Transaction,
  protocol_key: Option<PublicKeyHash>,
) -> Bool {
  when protocol_key is {
    Some(key) ->
      list.any(
        tx.outputs,
        fn(output) {
          when output.address.payment_credential is {
            VerificationKeyCredential(key1) -> key == key1
            _ -> False
          }
        },
      )
    None -> True
  }
}

pub fn paid_seller(
  tx: Transaction,
  payment_datum: PaymentDatum,
  listing_details: ListingDetails,
  remaining_lovelace: Int,
) -> Bool {
  value.lovelace_of(
    value_paid_to_with_datum(tx, listing_details.owner, payment_datum),
  ) >= remaining_lovelace
}

pub fn paid_tokens(
  tx: Transaction,
  token_amount: Int,
  presale_token: PresaleToken,
) -> Bool {
    list.any(
        tx.reference_inputs,
        fn(input) {
            let released_tokens = value.quantity_of(
              input.output.value, 
              presale_token.policy_id,
              presale_token.asset_name,
            ) 

            if released_tokens == token_amount {
                True
            } else {
                False
            }
        },
    )
}

