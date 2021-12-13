export const idlFactory = ({ IDL }) => {
  const ICP__1 = IDL.Record({ 'e8s' : IDL.Nat64 });
  const BlockIndex = IDL.Nat64;
  const TransferError = IDL.Variant({
    'TxTooOld' : IDL.Record({ 'allowed_window_nanos' : IDL.Nat64 }),
    'BadFee' : IDL.Record({ 'expected_fee' : ICP__1 }),
    'TxDuplicate' : IDL.Record({ 'duplicate_of' : BlockIndex }),
    'TxCreatedInFuture' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : ICP__1 }),
  });
  const TransferResult = IDL.Variant({
    'Ok' : BlockIndex,
    'Err' : TransferError,
  });
  const ICP = IDL.Service({
    'accountId' : IDL.Func([], [IDL.Text], []),
    'accountIdP' : IDL.Func([], [IDL.Text], []),
    'balance' : IDL.Func([], [ICP__1], []),
    'balanceShared' : IDL.Func([], [ICP__1], []),
    'transfer' : IDL.Func([ICP__1, IDL.Text], [TransferResult], []),
  });
  return ICP;
};
export const init = ({ IDL }) => { return []; };
