use aiken/transaction.{ScriptContext}
use presalano/types.{
  List, Contribute, Listing, TradeAction, TradeDatum, Cancel, 
  PresaleToken, PublicKeyHash, PaymentDatum
}
use presalano/utils.{get_own_input,tx_signed_by_address}
use presalano/validation.{paid_seller,paid_protocol,paid_tokens}

validator(protocol_key: Option<PublicKeyHash>, presale_token: PresaleToken, token_per_lovelace: Int) {
  fn spend(datum: TradeDatum, action: TradeAction, ctx: ScriptContext) -> Bool {
    let tx = ctx.transaction
    let own_input = get_own_input(ctx)
    let payment_datum = PaymentDatum { output_reference: own_input.output_reference }

    when action is {
        List -> {
            paid_protocol(tx, protocol_key)
        }
        Contribute -> {
            expect Listing(listing_details) = datum

            let accepted_lovelace = listing_details.requested_lovelace
            let token_amount = accepted_lovelace * token_per_lovelace

            paid_seller(
                tx, 
                payment_datum, 
                listing_details, 
                accepted_lovelace
            ) && paid_tokens(tx, token_amount, presale_token)
        }
        Cancel -> {
            expect Listing(listing_details) = datum

            tx_signed_by_address(tx, listing_details.owner)
        }
        _ -> False
    }
  }
}
