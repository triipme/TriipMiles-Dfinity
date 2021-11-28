export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({ 'username' : IDL.Opt(IDL.Text) });
  const Profile = IDL.Record({ 'user' : User });
  const Error = IDL.Variant({
    'AlreadyExisting' : IDL.Null,
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'SomethingWrong' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const TravelPlanInformation = IDL.Record({
    'img' : IDL.Opt(IDL.Text),
    'destination' : IDL.Opt(IDL.Text),
    'join_type' : IDL.Opt(IDL.Nat),
    'specific_date' : IDL.Opt(IDL.Bool),
    'timeStart' : IDL.Opt(IDL.Int),
    'days' : IDL.Opt(IDL.Nat),
    'activities' : IDL.Opt(IDL.Vec(IDL.Bool)),
    'created_at' : IDL.Opt(IDL.Int),
    'public_mode' : IDL.Opt(IDL.Bool),
    'proof' : IDL.Opt(IDL.Text),
    'timeEnd' : IDL.Opt(IDL.Int),
  });
  const TravelPlanUpdate = IDL.Record({
    'idtp' : IDL.Text,
    'travel_plan' : TravelPlanInformation,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Opt(Profile), 'err' : Error });
  const TravelPlan = IDL.Record({
    'uid' : IDL.Principal,
    'idtp' : IDL.Text,
    'travel_plan' : TravelPlanInformation,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Vec(TravelPlan), 'err' : Error });
  return IDL.Service({
    'create' : IDL.Func([Profile], [Result], []),
    'createTravelPlan' : IDL.Func([TravelPlanUpdate], [Result], []),
    'proofTP' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'read' : IDL.Func([], [Result_2], []),
    'readAllTPUser' : IDL.Func([], [Result_1], []),
    'updateTravelPlan' : IDL.Func([TravelPlanUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
