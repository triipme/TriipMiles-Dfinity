export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({ 'username' : IDL.Opt(IDL.Text) });
  const Profile = IDL.Record({
    'user' : User,
    'wallets' : IDL.Opt(IDL.Vec(IDL.Text)),
  });
  const Error = IDL.Variant({
    'AlreadyExisting' : IDL.Null,
    'Failed' : IDL.Null,
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'SomethingWrong' : IDL.Null,
  });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Tuple(Profile, IDL.Text),
    'err' : Error,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const ProofTP__1 = IDL.Record({
    'img_key' : IDL.Opt(IDL.Text),
    'created_at' : IDL.Opt(IDL.Nat),
  });
  const Result_5 = IDL.Variant({ 'ok' : IDL.Opt(IDL.Text), 'err' : Error });
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
    'timeEnd' : IDL.Opt(IDL.Int),
  });
  const TravelPlanUpdate = IDL.Record({
    'idtp' : IDL.Text,
    'travel_plan' : TravelPlanInformation,
  });
  const Result_4 = IDL.Variant({ 'ok' : IDL.Text, 'err' : Error });
  const TravelPlan = IDL.Record({
    'uid' : IDL.Principal,
    'is_received' : IDL.Bool,
    'travel_plan' : TravelPlanInformation,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Text, TravelPlan)),
    'err' : Error,
  });
  const ProofTP = IDL.Record({
    'uid' : IDL.Principal,
    'status' : IDL.Bool,
    'proof' : ProofTP__1,
  });
  const Result_1 = IDL.Variant({ 'ok' : ProofTP, 'err' : Error });
  return IDL.Service({
    'addWallet' : IDL.Func([IDL.Text], [Result_3], []),
    'create' : IDL.Func([Profile], [Result], []),
    'createProofTP' : IDL.Func([IDL.Text, ProofTP__1], [Result_5], []),
    'createTravelPlan' : IDL.Func([TravelPlanUpdate], [Result_4], []),
    'read' : IDL.Func([], [Result_3], []),
    'readAllProof' : IDL.Func([], [Result], []),
    'readAllTPUser' : IDL.Func([], [Result_2], []),
    'readProofOfTP' : IDL.Func([IDL.Text], [Result_1], []),
    'setStatusReceivedICP' : IDL.Func([IDL.Bool, IDL.Text], [Result], []),
    'updateTravelPlan' : IDL.Func([TravelPlanUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
