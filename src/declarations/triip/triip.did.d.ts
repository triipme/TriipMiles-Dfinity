import type { Principal } from '@dfinity/principal';
export type Error = { 'AlreadyExisting' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'SomethingWrong' : null };
export interface Profile { 'user' : User }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : [] | [Profile] } |
  { 'err' : Error };
export interface TravelPlanInformation {
  'img' : [] | [string],
  'destination' : [] | [string],
  'join_type' : [] | [bigint],
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
  'createTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result>,
  'read' : () => Promise<Result_1>,
  'readAllTPUser' : () => Promise<Result>,
  'updateTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result>,
}
