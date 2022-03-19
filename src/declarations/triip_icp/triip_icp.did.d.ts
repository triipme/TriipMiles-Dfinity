import type { Principal } from '@dfinity/principal';
export type BlockIndex = bigint;
export interface ICP {
  'accountId' : () => Promise<string>,
  'accountIdP' : () => Promise<string>,
  'balance' : () => Promise<ICP__1>,
  'balanceShared' : () => Promise<ICP__1>,
  'transfer' : (arg_0: [] | [string], arg_1: string) => Promise<TransferResult>,
}
export interface ICP__1 { 'e8s' : bigint }
export type TransferError = {
    'TxTooOld' : { 'allowed_window_nanos' : bigint }
  } |
  { 'BadFee' : { 'expected_fee' : ICP__1 } } |
  { 'TxDuplicate' : { 'duplicate_of' : BlockIndex } } |
  { 'TxCreatedInFuture' : null } |
  { 'InsufficientFunds' : { 'balance' : ICP__1 } };
export type TransferResult = { 'Ok' : BlockIndex } |
  { 'Err' : TransferError };
export interface _SERVICE extends ICP {}
