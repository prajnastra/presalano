use aiken/list
use aiken/transaction.{InlineDatum, Input, ScriptContext, Spend, Transaction}
use aiken/transaction/credential.{
  Address, ScriptCredential, VerificationKeyCredential,
}
use presalano/types.{PaymentDatum, ScriptHash}

pub fn get_own_input(ctx: ScriptContext) -> Input {
  expect Spend(output_reference) =
    ctx.purpose
  expect Some(input) =
    list.find(
      ctx.transaction.inputs,
      fn(input) { input.output_reference == output_reference },
    )
  input
}

pub fn value_paid_to_with_datum(
  tx: Transaction,
  address: Address,
  payment_datum: PaymentDatum,
) -> Bool {
  when
    list.find(
      tx.outputs,
      fn(output) {
        output.address == address && output.datum == InlineDatum(payment_datum)
      },
    )
  is {
    Some(_) ->
      True
    None ->
      False
  }
}

pub fn tx_signed_by_address(tx: Transaction, owner: Address) -> Bool {
  when owner.payment_credential is {
    VerificationKeyCredential(keyhash) ->
      list.has(tx.extra_signatories, keyhash)
    ScriptCredential(scripthash) ->
      signed_with_input(tx, scripthash)
  }
}

fn signed_with_input(tx: Transaction, scripthash: ScriptHash) -> Bool {
  when
    list.find(
      tx.inputs,
      fn(input) {
        when input.output.address.payment_credential is {
          VerificationKeyCredential(_) ->
            False
          ScriptCredential(scripthash1) ->
            scripthash == scripthash1
        }
      },
    )
  is {
    Some(_) ->
      True
    None ->
      False
  }
}
