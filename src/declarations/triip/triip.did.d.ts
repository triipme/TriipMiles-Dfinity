import type { Principal } from '@dfinity/principal';
export type Error = { 'AlreadyExisting' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null };
export interface Profile { 'id' : Principal, 'user' : User }
export interface ProfileUpdate { 'user' : User }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Profile } |
  { 'err' : Error };
export interface User { 'username' : [] | [string] }
export interface _SERVICE {
  'create' : (arg_0: ProfileUpdate) => Promise<Result>,
  'delete' : () => Promise<Result>,
  'read' : () => Promise<Result_1>,
  'update' : (arg_0: Profile) => Promise<Result>,
}
