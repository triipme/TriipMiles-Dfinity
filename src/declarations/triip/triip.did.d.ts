import type { Principal } from '@dfinity/principal';
export type Error = { 'AlreadyExisting' : null } |
  { 'Failed' : null } |
  { 'Enough' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'SomethingWrong' : null };
export interface Profile { 'user' : User, 'wallets' : [] | [Array<string>] }
export interface ProofTP {
  'uid' : Principal,
  'status' : boolean,
  'created_at' : bigint,
  'proof' : ProofTP__1,
}
export interface ProofTP__1 { 'img_key' : [] | [string] }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : ProofTP } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<[string, TravelPlan]> } |
  { 'err' : Error };
export type Result_3 = { 'ok' : [Profile, string] } |
  { 'err' : Error };
export type Result_4 = { 'ok' : string } |
  { 'err' : Error };
export type Result_5 = { 'ok' : [] | [string] } |
  { 'err' : Error };
export interface TravelPlan {
  'uid' : Principal,
  'is_received' : boolean,
  'created_at' : bigint,
  'travel_plan' : TravelPlanInformation,
}
export interface TravelPlanInformation {
  'img' : [] | [string],
  'destination' : [] | [string],
  'join_type' : [] | [bigint],
  'specific_date' : [] | [boolean],
  'timeStart' : [] | [bigint],
  'days' : [] | [bigint],
  'activities' : [] | [Array<boolean>],
  'week_of_year' : [] | [string],
  'public_mode' : [] | [boolean],
  'timeEnd' : [] | [bigint],
}
export interface TravelPlanUpdate {
  'idtp' : string,
  'travel_plan' : TravelPlanInformation,
}
export interface User { 'username' : [] | [string] }
export interface _SERVICE {
  'addWallet' : (arg_0: string) => Promise<Result_3>,
  'create' : (arg_0: Profile) => Promise<Result>,
  'createProofTP' : (arg_0: string, arg_1: ProofTP__1) => Promise<Result_5>,
  'createTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result_4>,
  'read' : () => Promise<Result_3>,
  'readAllProof' : () => Promise<Result>,
  'readAllTPUser' : () => Promise<Result_2>,
  'readProofOfTP' : (arg_0: string) => Promise<Result_1>,
  'setStatusReceivedICP' : (arg_0: boolean, arg_1: string) => Promise<Result>,
  'updateTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result>,
}
