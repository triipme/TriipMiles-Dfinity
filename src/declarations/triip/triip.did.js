export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({ 'username' : IDL.Opt(IDL.Text) });
  const ProfileUpdate = IDL.Record({ 'user' : User });
  const Error = IDL.Variant({
    'AlreadyExisting' : IDL.Null,
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'SomethingWrong' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const TravelPlanInformation = IDL.Record({
    'destination' : IDL.Opt(IDL.Text),
    'join_type' : IDL.Opt(IDL.Nat),
    'timeStart' : IDL.Opt(IDL.Int),
    'days' : IDL.Opt(IDL.Nat),
    'activities' : IDL.Opt(IDL.Vec(IDL.Bool)),
    'public_mode' : IDL.Opt(IDL.Bool),
    'timeEnd' : IDL.Opt(IDL.Int),
  });
  const TravelPlanUpdate = IDL.Record({
    'id' : IDL.Opt(IDL.Text),
    'travel_plan' : TravelPlanInformation,
  });
  const Profile = IDL.Record({ 'id' : IDL.Principal, 'user' : User });
  const Result_1 = IDL.Variant({ 'ok' : Profile, 'err' : Error });
  return IDL.Service({
    'create' : IDL.Func([ProfileUpdate], [Result], []),
    'createTravelPlan' : IDL.Func([IDL.Text, TravelPlanUpdate], [Result], []),
    'delete' : IDL.Func([], [Result], []),
    'read' : IDL.Func([], [Result_1], []),
    'update' : IDL.Func([Profile], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
