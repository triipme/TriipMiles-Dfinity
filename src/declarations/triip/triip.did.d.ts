import type { Principal } from '@dfinity/principal';
export type Error = { 'AlreadyExisting' : null } |
  { 'Failed' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'SomethingWrong' : null };
export interface Profile { 'user' : User }
export interface ProofTP {
  'uid' : Principal,
  'status' : boolean,
  'proof' : ProofTP__1,
}
export interface ProofTP__1 {
  'img_key' : [] | [string],
  'created_at' : [] | [bigint],
}
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : ProofTP } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<[string, TravelPlan]> } |
  { 'err' : Error };
export type Result_3 = { 'ok' : [] | [Profile] } |
  { 'err' : Error };
export type Result_4 = { 'ok' : string } |
  { 'err' : Error };
export type Result_5 = { 'ok' : [] | [string] } |
  { 'err' : Error };
export interface TravelPlan {
  'uid' : Principal,
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
  'created_at' : [] | [bigint],
  'public_mode' : [] | [boolean],
  'timeEnd' : [] | [bigint],
}
export interface TravelPlanUpdate {
  'idtp' : string,
  'travel_plan' : TravelPlanInformation,
}
export interface User { 'username' : [] | [string] }
export interface _SERVICE {
  'create' : (arg_0: Profile) => Promise<Result>,
  'createProofTP' : (arg_0: string, arg_1: ProofTP__1) => Promise<Result_5>,
  'createTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result_4>,
  'read' : () => Promise<Result_3>,
  'readAllProof' : () => Promise<Result>,
  'readAllTPUser' : () => Promise<Result_2>,
  'readProofOfTP' : (arg_0: string) => Promise<Result_1>,
  'updateTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result>,
}
