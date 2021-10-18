export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'hello' : IDL.Func([], [], ['query']) });
};
export const init = ({ IDL }) => { return []; };
