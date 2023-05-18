use aiken/transaction.{ScriptContext}
use presalano/types.{
  Contribute, Listing, TradeAction, TradeDatum,
  PresaleToken, PublicKeyHash, Finalize
}
use presalano/utils.{tx_signed_by_address}
use presalano/validation.{paid_protocol,paid_tokens}

validator(protocol_key: Option<PublicKeyHash>, presale_token: PresaleToken, token_per_lovelace: Int) {
  fn spend(datum: TradeDatum, action: TradeAction, ctx: ScriptContext) -> Bool {
    let tx = ctx.transaction
    let Listing(listing_details) = datum

    when action is {
        Contribute -> {
            let accepted_lovelace = listing_details.requested_lovelace
            let token_amount = accepted_lovelace * token_per_lovelace

            paid_tokens(tx, token_amount, presale_token)
        }
        Finalize -> {
            tx_signed_by_address(tx, listing_details.owner) && paid_protocol(tx, protocol_key)
        }
    }
  }
}
