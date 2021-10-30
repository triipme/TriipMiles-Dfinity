export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({ 'username' : IDL.Opt(IDL.Text) });
  const Profile = IDL.Record({ 'id' : IDL.Principal, 'user' : User });
  const Error = IDL.Variant({
    'AlreadyExisting' : IDL.Null,
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const Result_1 = IDL.Variant({ 'ok' : Profile, 'err' : Error });
  return IDL.Service({
    'create' : IDL.Func([Profile], [Result], []),
    'delete' : IDL.Func([], [Result], []),
    'read' : IDL.Func([], [Result_1], []),
    'update' : IDL.Func([Profile], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
