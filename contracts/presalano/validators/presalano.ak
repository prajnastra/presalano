use aiken/transaction.{ScriptContext}
use presalano/types.{
  Contribute, Finalize, Listing, PaymentDatum, PresaleToken, PublicKeyHash,
  TradeAction, TradeDatum,
}
use presalano/utils.{get_own_input, tx_signed_by_address}
use presalano/validation.{paid_seller}

validator(protocol_key: Option<PublicKeyHash>, presale_token: PresaleToken) {
  fn spend(datum: TradeDatum, action: TradeAction, ctx: ScriptContext) -> Bool {
    let tx =
      ctx.transaction
    let own_input =
      get_own_input(ctx)
    let Listing(listing_details) =
      datum
    let payment_datum =
      PaymentDatum { output_reference: own_input.output_reference }

    when action is {
      Contribute ->
        paid_seller(tx, payment_datum, listing_details)
      Finalize ->
        tx_signed_by_address(tx, listing_details.owner)
    }
  }
}
