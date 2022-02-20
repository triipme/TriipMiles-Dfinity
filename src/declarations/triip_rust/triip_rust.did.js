export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'triip_rust' : IDL.Func([], [IDL.Text], ['query']) });
};
export const init = ({ IDL }) => { return []; };
