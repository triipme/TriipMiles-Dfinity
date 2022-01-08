import type { Principal } from '@dfinity/principal';
export interface Admin { 'admin' : Admin__1 }
export interface Admin__1 {
  'email' : [] | [string],
  'first_name' : [] | [string],
  'last_name' : [] | [string],
}
export interface Analysis {
  'proofs_approved' : bigint,
  'proofs_rejected' : bigint,
  'travelplans' : bigint,
  'profiles' : bigint,
}
export type Error = { 'AlreadyExisting' : null } |
  { 'Failed' : null } |
  { 'Enough' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'SomethingWrong' : null };
export interface Profile { 'user' : User, 'wallets' : [] | [Array<string>] }
export interface ProofTP {
  'uid' : Principal,
  'status' : string,
  'created_at' : bigint,
  'proof' : ProofTP__1,
}
export interface ProofTP__1 { 'img_key' : [] | [string] }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Admin } |
  { 'err' : Error };
export type Result_2 = { 'ok' : ProofTP } |
  { 'err' : Error };
export type Result_3 = { 'ok' : Array<[string, TravelPlan, [] | [ProofTP]]> } |
  { 'err' : Error };
export type Result_4 = { 'ok' : [Profile, string] } |
  { 'err' : Error };
export type Result_5 = {
    'ok' : Array<
      [string, TravelPlan, [] | [ProofTP], [] | [Vetted], [] | [string]]
    >
  } |
  { 'err' : Error };
export type Result_6 = { 'ok' : string } |
  { 'err' : Error };
export type Result_7 = { 'ok' : [] | [string] } |
  { 'err' : Error };
export type Result_8 = { 'ok' : [] | [Array<string>] } |
  { 'err' : Error };
export type Result_9 = { 'ok' : [Analysis, Array<string>] } |
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
export interface Vetted { 'updated_at' : bigint, 'staff' : Principal }
export interface _SERVICE {
  'addWallet' : (arg_0: string) => Promise<Result_4>,
  'analysis' : () => Promise<Result_9>,
  'approveHP_admin' : (arg_0: string, arg_1: string, arg_2: ProofTP) => Promise<
      Result_8
    >,
  'create' : (arg_0: Profile) => Promise<Result>,
  'createProofTP' : (arg_0: string, arg_1: ProofTP__1) => Promise<Result_7>,
  'createTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result_6>,
  'getAllTP_admin' : () => Promise<Result_5>,
  'loginAdmin' : () => Promise<Result_1>,
  'read' : () => Promise<Result_4>,
  'readAllProof' : () => Promise<Result>,
  'readAllTPUser' : () => Promise<Result_3>,
  'readProofOfTP' : (arg_0: string) => Promise<Result_2>,
  'registerAdmin' : (arg_0: string, arg_1: Admin) => Promise<Result_1>,
  'setStatusReceivedICP' : (arg_0: boolean, arg_1: string) => Promise<Result>,
  'updateTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result>,
}
