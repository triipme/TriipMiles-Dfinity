import type { Principal } from '@dfinity/principal';
export type Error = { 'AlreadyExisting' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'SomethingWrong' : null };
export interface Profile { 'id' : Principal, 'user' : User }
export interface ProfileUpdate { 'user' : User }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Profile } |
  { 'err' : Error };
export interface TravelPlanInformation {
  'destination' : [] | [string],
  'join_type' : [] | [bigint],
  'timeStart' : [] | [bigint],
  'days' : [] | [bigint],
  'activities' : [] | [Array<boolean>],
  'public_mode' : [] | [boolean],
  'timeEnd' : [] | [bigint],
}
export interface TravelPlanUpdate {
  'idtp' : string,
  'travel_plan' : TravelPlanInformation,
}
export interface User { 'username' : [] | [string] }
export interface _SERVICE {
  'create' : (arg_0: ProfileUpdate) => Promise<Result>,
  'createTravelPlan' : (arg_0: TravelPlanUpdate) => Promise<Result>,
  'delete' : () => Promise<Result>,
  'read' : () => Promise<Result_1>,
  'update' : (arg_0: Profile) => Promise<Result>,
}
