export const idlFactory = ({ IDL }) => {
  const User = IDL.Record({ 'username' : IDL.Opt(IDL.Text) });
  const Profile = IDL.Record({
    'user' : User,
    'wallets' : IDL.Opt(IDL.Vec(IDL.Text)),
  });
  const Error = IDL.Variant({
    'AlreadyExisting' : IDL.Null,
    'Failed' : IDL.Null,
    'Enough' : IDL.Null,
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'SomethingWrong' : IDL.Null,
  });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Tuple(Profile, IDL.Text),
    'err' : Error,
  });
  const Analysis = IDL.Record({
    'proofs_approved' : IDL.Nat,
    'proofs_rejected' : IDL.Nat,
    'travelplans' : IDL.Nat,
    'profiles' : IDL.Nat,
  });
  const Result_9 = IDL.Variant({
    'ok' : IDL.Tuple(Analysis, IDL.Vec(IDL.Text)),
    'err' : Error,
  });
  const ProofTP__1 = IDL.Record({ 'img_key' : IDL.Opt(IDL.Text) });
  const ProofTP = IDL.Record({
    'uid' : IDL.Principal,
    'status' : IDL.Text,
    'created_at' : IDL.Int,
    'proof' : ProofTP__1,
  });
  const Result_8 = IDL.Variant({
    'ok' : IDL.Opt(IDL.Vec(IDL.Text)),
    'err' : Error,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const Result_7 = IDL.Variant({ 'ok' : IDL.Opt(IDL.Text), 'err' : Error });
  const TravelPlanInformation = IDL.Record({
    'img' : IDL.Opt(IDL.Text),
    'destination' : IDL.Opt(IDL.Text),
    'join_type' : IDL.Opt(IDL.Nat),
    'specific_date' : IDL.Opt(IDL.Bool),
    'timeStart' : IDL.Opt(IDL.Int),
    'days' : IDL.Opt(IDL.Nat),
    'activities' : IDL.Opt(IDL.Vec(IDL.Bool)),
    'week_of_year' : IDL.Opt(IDL.Text),
    'public_mode' : IDL.Opt(IDL.Bool),
    'timeEnd' : IDL.Opt(IDL.Int),
  });
  const TravelPlanUpdate = IDL.Record({
    'idtp' : IDL.Text,
    'travel_plan' : TravelPlanInformation,
  });
  const Result_6 = IDL.Variant({ 'ok' : IDL.Text, 'err' : Error });
  const TravelPlan = IDL.Record({
    'uid' : IDL.Principal,
    'is_received' : IDL.Bool,
    'created_at' : IDL.Int,
    'travel_plan' : TravelPlanInformation,
  });
  const Vetted = IDL.Record({
    'updated_at' : IDL.Int,
    'staff' : IDL.Principal,
  });
  const Result_5 = IDL.Variant({
    'ok' : IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        TravelPlan,
        IDL.Opt(ProofTP),
        IDL.Opt(Vetted),
        IDL.Opt(IDL.Text),
      )
    ),
    'err' : Error,
  });
  const Admin__1 = IDL.Record({
    'email' : IDL.Opt(IDL.Text),
    'first_name' : IDL.Opt(IDL.Text),
    'last_name' : IDL.Opt(IDL.Text),
  });
  const Admin = IDL.Record({ 'admin' : Admin__1 });
  const Result_1 = IDL.Variant({ 'ok' : Admin, 'err' : Error });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Text, TravelPlan, IDL.Opt(ProofTP))),
    'err' : Error,
  });
  const Result_2 = IDL.Variant({ 'ok' : ProofTP, 'err' : Error });
  return IDL.Service({
    'addWallet' : IDL.Func([IDL.Text], [Result_4], []),
    'analysis' : IDL.Func([], [Result_9], ['query']),
    'approveHP_admin' : IDL.Func([IDL.Text, IDL.Text, ProofTP], [Result_8], []),
    'create' : IDL.Func([Profile], [Result], []),
    'createProofTP' : IDL.Func([IDL.Text, ProofTP__1], [Result_7], []),
    'createTravelPlan' : IDL.Func([TravelPlanUpdate], [Result_6], []),
    'getAllTP_admin' : IDL.Func([], [Result_5], ['query']),
    'loginAdmin' : IDL.Func([], [Result_1], ['query']),
    'read' : IDL.Func([], [Result_4], ['query']),
    'readAllProof' : IDL.Func([], [Result], []),
    'readAllTPUser' : IDL.Func([], [Result_3], ['query']),
    'readProofOfTP' : IDL.Func([IDL.Text], [Result_2], []),
    'registerAdmin' : IDL.Func([IDL.Text, Admin], [Result_1], []),
    'setStatusReceivedICP' : IDL.Func([IDL.Bool, IDL.Text], [Result], []),
    'updateTravelPlan' : IDL.Func([TravelPlanUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
