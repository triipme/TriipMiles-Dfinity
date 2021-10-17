export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'get' : IDL.Func([], [IDL.Nat], ['query']),
    'inc' : IDL.Func([], [IDL.Nat], []),
    'set' : IDL.Func([IDL.Nat], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
