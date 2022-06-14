import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Float "mo:base/Float";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Int64 "mo:base/Int64";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Random "mo:base/Random";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Trie "mo:base/Trie";

import AId "mo:principal/blob/AccountIdentifier";

import Env ".env";
import GeneralUtils "./utils/general";
import Ledger "../triip_models/model/Ledger";
import LuckyWheel "./luckyWheel";
// import MemoryCardController "./controllers/games/memory_card";
import Moment "./utils/moment";
import ProofTP "../triip_models/model/ProofTP";
import State "../triip_models/State";
import Types "../triip_models/Types";

shared({caller = owner}) actor class Triip() = this {
  /*------------------------ App state--------------------------- */
  var state : State.State = State.empty();

  private stable var profiles : [(Principal, Types.Profile)] = [];
  private stable var travelplans : [(Text, Types.TravelPlan)] = [];
  private stable var proofs : [(Text, Types.ProofTP)] = [];
  private stable var admin : [(Principal, Types.Admin)] = [];
  private stable var vetted : [(Text, Types.Vetted)] = [];
  private stable var kycs : [(Principal, Types.KYCs)] = [];
  private stable var prizes : [(Text, Types.Prize)] = [];
  private stable var wheels : [(Text, Types.LuckyWheel)] = [];
  private stable var spinresults : [(Text, Types.SpinResult)] = [];
  private stable var games = {
    memory_card = {
      games : [(Text, Types.MemoryCardGame)] = [];
      stages : [(Text, Types.MemoryCardStage)] = [];
      cards : [(Text, Types.MemoryCard)] = [];
      players : [(Text, Types.MemoryCardPlayer)] = [];
      rewards : [(Text, Types.MemoryCardReward)] = [];
    };
    memory_card_engine = {
      players : [(Text, Types.MemoryCardEnginePlayer)] = [];
      rewards : [(Text, Types.MemoryCardEngineReward)] = [];
    }
  };
  private stable var transactions : [(Text, Types.TxRecord)] = [];

  system func preupgrade() {
    Debug.print("Begin preupgrade");
    profiles := Iter.toArray(state.profiles.entries());
    travelplans := Iter.toArray(state.travelplans.entries());
    proofs := Iter.toArray(state.proofs.entries());
    admin := Iter.toArray(state.admin.entries());
    vetted := Iter.toArray(state.vetted.entries());
    kycs := Iter.toArray(state.kycs.entries());
    prizes := Iter.toArray(state.prizes.entries());
    wheels := Iter.toArray(state.wheels.entries());
    spinresults := Iter.toArray(state.spinresults.entries());
    games := {
      memory_card = {
        games = Iter.toArray(state.games.memory_card.games.entries());
        stages = Iter.toArray(state.games.memory_card.stages.entries());
        cards = Iter.toArray(state.games.memory_card.cards.entries());
        players = Iter.toArray(state.games.memory_card.players.entries());
        rewards = Iter.toArray(state.games.memory_card.rewards.entries());
      };
      memory_card_engine = {
        players = Iter.toArray(state.games.memory_card_engine.players.entries());
        rewards = Iter.toArray(state.games.memory_card_engine.rewards.entries());
      };
    };
    transactions := Iter.toArray(state.transactions.entries());
    Debug.print("End preupgrade");
  };

  system func postupgrade() {
    Debug.print("Begin postupgrade");
    for ((k, v) in Iter.fromArray(admin)) {
      state.admin.put(k, v);
    };
    for ((k, v) in Iter.fromArray(profiles)) {
      state.profiles.put(k, v);
    };
    for ((k, v) in Iter.fromArray(travelplans)) {
      state.travelplans.put(k, v);
    };
    for ((k, v) in Iter.fromArray(proofs)) {
      state.proofs.put(k, v);
    };
    for ((k, v) in Iter.fromArray(vetted)) {
      state.vetted.put(k, v);
    };
    for ((k, v) in Iter.fromArray(kycs)) {
      state.kycs.put(k, v);
    };
    for ((k, v) in Iter.fromArray(prizes)) {
      state.prizes.put(k, v);
    };
    for ((k, v) in Iter.fromArray(wheels)) {
      state.wheels.put(k, v);
    };
    for ((k, v) in Iter.fromArray(spinresults)) {
      state.spinresults.put(k, v);
    };
    for ((k, v) in Iter.fromArray(games.memory_card.games)) {
      state.games.memory_card.games.put(k, v);
    };
    for ((k, v) in Iter.fromArray(games.memory_card.stages)) {
      state.games.memory_card.stages.put(k, v);
    };
    for ((k, v) in Iter.fromArray(games.memory_card.cards)) {
      state.games.memory_card.cards.put(k, v);
    };
    for ((k, v) in Iter.fromArray(games.memory_card.players)) {
      state.games.memory_card.players.put(k, v);
    };
    for ((k, v) in Iter.fromArray(games.memory_card.rewards)) {
      state.games.memory_card.rewards.put(k, v);
    };
    for ((k, v) in Iter.fromArray(games.memory_card_engine.players)) {
      state.games.memory_card_engine.players.put(k, v);
    };
    for ((k, v) in Iter.fromArray(games.memory_card_engine.rewards)) {
      state.games.memory_card_engine.rewards.put(k, v);
    };
    for ((k, v) in Iter.fromArray(transactions)) {
      state.transactions.put(k, v);
    };
    Debug.print("End postupgrade");
  };

  type Response<Ok> = Result.Result<Ok, Types.Error>;
  private let ledger : Ledger.Interface = actor(Env.LEDGER_ID);

  public query func accountId() : async Text {
    AId.toText(aId());
  };

  public func accountIdP(principal : Principal) : async Text {
    AId.toText(principalToAid(principal));
  };

  private func aId() : AId.AccountIdentifier {
    AId.fromPrincipal(Principal.fromActor(this), null);
  };

  private func principalToAid(p : Principal) : AId.AccountIdentifier {
    AId.fromPrincipal(p, null)
  };

  public func balance() : async Ledger.ICP {
    await ledger.account_balance({
      account = aId();
    });
  };

  public shared({caller}) func balanceShared() : async Ledger.ICP {
    assert(caller == owner);
    await ledger.account_balance({
      account = principalToAid(caller);
    });
  };

  func transfer(amount : Ledger.ICP, to : Text) : async Ledger.TransferResult {
    // assert(caller == owner); //this check principal owner vs caller is Admin
    let toAId : AId.AccountIdentifier = switch (AId.fromText(to)) {
      case (#err(_)) {
        assert(false);
        loop {};
      };
      case (#ok(a)) a;
    };
    let now = Time.now();
    await ledger.transfer({
      memo            = 1;
      amount          = amount;
      fee             = { e8s = 10_000 };
      from_subaccount = null;
      to              = toAId;
      created_at_time = ?{ timestamp_nanos = Nat64.fromNat(Int.abs(now)) };
    });
  };

  func recordTransaction(
    caller : Principal,
    amount : Ledger.ICP, to : Text,
    refType : Text, refId : Text,
    transferResult : Ledger.TransferResult,
    prevId : ?Text
  ) : async () {
    var blockIndex : ?Nat64 = null;
    var txError : ?Text = null;
    switch (transferResult) {
      case (#Ok(bIndex)) {
        Debug.print("Paid reward to principal " # debug_show to # " in block " # debug_show bIndex);
        blockIndex := ?bIndex;
      };
      case (#Err(error)) {
        Debug.print("Unexpected transfer error: " # debug_show error);
        txError := ?debug_show error;
      };
    };

    let uuid : Text = Option.get(prevId, await GeneralUtils.createUUID());
    let record : Types.TxRecord = {
      uuid = uuid;
      caller = caller;
      refType = refType;
      refId = refId;
      blockIndex = blockIndex;
      toAddress = to;
      amount = amount;
      fee = { e8s = 10_000 };
      timestamp = Time.now();
      txError = txError;
    };
    switch (prevId) {
      case null {
        state.transactions.put(uuid, record);
      };
      case (? id) {
        let replaced = state.transactions.replace(id, record);
        ();
      };
    };
  };

  //Admin
  type Analysis = {
    profiles : Nat;
    travelplans : Nat;
    proofs_approved : Nat;
    proofs_rejected : Nat;
  };

  public query({caller}) func analysis() : async Response<(Analysis,[Text])>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    var p : Nat = state.profiles.size();
    var t : Nat = state.travelplans.size();
    var pfApproved : Nat = 0;
    var pfRejected : Nat = 0;
    for((K, proof)in state.proofs.entries()) {
      if(proof.status == "approved") {
        pfApproved += 1;
      } else {
        if(proof.status != "waitting") {
          pfRejected+=1;
        }
      }
    };
    let destination = Iter.map(state.travelplans.vals(),
      func (t : Types.TravelPlan) : Text { Option.get(t.travel_plan.destination,"") });
    let analysis = {
      profiles = p;
      travelplans = t;
      proofs_approved = pfApproved;
      proofs_rejected = pfRejected;
    };
    #ok((analysis, Iter.toArray(destination)));
  };

  private func isAdmin(key : Principal) : ?Types.Admin {
    state.admin.get(key);
  };

  private func isSecretKey(key : Text) : Bool {
    Text.hash(key) == Text.hash(Env.secret_key_admin);
  };

  public shared query({caller}) func loginAdmin() : async Response<Types.Admin>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    let is_admin = isAdmin(caller);
    switch (is_admin) {
      case (null) #err(#NotFound);
      case (? v) #ok((v));
    }
  };

  public shared({caller}) func registerAdmin(key : Text, info : Types.Admin) : async Response<Types.Admin>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    let isKey = isSecretKey(key);
    if(isKey) {
      state.admin.put(caller, info);
      let rs = isAdmin(caller);
      switch (rs) {
        case (null) #err(#NotFound);
        case (? v) #ok((v));
      };
    } else {
      #err(#Failed);
    }
  };

  private func getHPofTPAdmin(key : Text) : ?Types.ProofTP{
    state.proofs.get(key);
  };

  private func getInfoStaffAdmin(key : Principal) : Text{
    let staff = state.admin.get(key);
    switch (staff) {
      case (null) return "Not Found Info Staff";
      case (? v) return Text.concat(Option.get(v.admin.first_name, ""), " "#Option.get(v.admin.last_name, ""));
    };
  };

  private func getStaffAdmin(key : Text) : ?Types.Vetted{
    state.vetted.get(key);
  };

  public shared query({caller}) func getAllTPAdmin() : async Response<[(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)]>{
    var allTP : [(
      Text, 
      Types.TravelPlan, 
      ?Types.ProofTP, 
      ?Types.Vetted, 
      ?Text
    )] = [];
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    for((K,V) in state.travelplans.entries()) {
      switch (getStaffAdmin(K)) {
        case (null) {
          switch (getHPofTPAdmin(K)) {
            case (null) {
              allTP := Array.append<(
                Text, 
                Types.TravelPlan, 
                ?Types.ProofTP,
                ?Types.Vetted,
                ?Text
              )>([(K, V, null, null, null)], allTP);
            };
            case (? v) {
              allTP := Array.append<(
                Text, 
                Types.TravelPlan, 
                ?Types.ProofTP,
                ?Types.Vetted,
                ?Text
              )>(allTP, [(K, V, ?v, null, null)]);
            }
          }
        };
        case (? vetted) {
          let vetted_staff = getInfoStaffAdmin(vetted.staff);
          switch (getHPofTPAdmin(K)) {
            case (null) {
              allTP := Array.append<(
                Text,
                Types.TravelPlan,
                ?Types.ProofTP,
                ?Types.Vetted,
                ?Text
              )>([(K, V, null, ?vetted, ?vetted_staff)], allTP);
            };
            case (? v) {
              allTP := Array.append<(
                Text,
                Types.TravelPlan,
                ?Types.ProofTP,
                ?Types.Vetted,
                ?Text
              )>(allTP, [(K, V, ?v, ?vetted, ?vetted_staff)]);
            }
          }
        }
      }
    };
    #ok(allTP);
  };

  public shared ({caller}) func approveHPAdmin(id_proof : Text, status:Text, proof : Types.ProofTP) : async Response<()> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let proof_update : Types.ProofTP = {
      proof = proof.proof;
      uid = proof.uid;
      status = status;
      created_at = proof.created_at;
    };
    let vettedData : Types.Vetted = {
      staff  = caller;
      updated_at = Time.now() / 10**9;
    };
    let replacedProof = state.proofs.replace(id_proof, proof_update);
    let vettedProof = state.vetted.put(id_proof, vettedData);
    if(Text.equal(status, "approved")) {
      switch (state.profiles.get(proof.uid)) {
        case (null) #err(#NotFound);
        case (? profile) {
          switch (await isKYCedUser(proof.uid)) {
            case (false) {
              #err(#NonKYC);
            };
            case (true) {
              let amount : Ledger.ICP = { e8s = 3_300 };
              let toAddress = Option.get(profile.wallets, [""])[0];
              let res = await transfer(amount, toAddress);
              await recordTransaction(
                caller, amount, toAddress, "ProofOfTravelPlan", id_proof, res, null
              );
              #ok(());
            };
          }
        }
      };
    } else {
      #ok(());
    }
  };

  public shared query({ caller }) func listTransactions() : async Response<[Types.TxRecord]> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    #ok(Iter.toArray(state.transactions.vals()));
  };

  public shared ({caller}) func retryTransaction(uuid : Text) : async Response<(?Types.TxRecord)> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let record = state.transactions.get(uuid);
    switch (record) {
      case null {
        #err(#NotFound);
      };
      case (? transaction) {
        if (transaction.blockIndex == null) {
          let res = await transfer(
            transaction.amount, transaction.toAddress
          );
          await recordTransaction(
            caller, transaction.amount, transaction.toAddress,
            transaction.refType, transaction.refId, res, ?uuid
          );
        };
        #ok(state.transactions.get(uuid));
      };
    };
  };

  /* ------------------------------------------------------------------------------------------------------- */
  // User
  // Create
  public query({caller}) func storage() : async Response<(Text, Text, Text, Text)>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    #ok((Env.S3_BUCKET, Env.S3_ACCESS_KEY, Env.S3_SECRET_KEY, Env.S3_REGION))
  };

  public shared({caller}) func create(profile: Types.Profile) : async Response<()> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    let rsCreateUser = state.profiles.put(caller, profile);
    let rsReadUser = state.profiles.get(caller);

    switch (rsReadUser) {
      case null{
        #err(#NotFound);
      };
      case (?v) {
        #ok(());
      };
    }
  };

  public shared query({caller}) func read() : async Response<(Types.Profile, Text)>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    let rsReadUser = state.profiles.get(caller);
    switch (rsReadUser) {
      case null{
        #err(#NotFound);
      };
      case (? v) {
        #ok((v, Principal.toText(caller)));
      };
    }
  };

  // Wallet
  public shared({caller}) func addWallet(wallet_id : Text) : async Response<(Types.Profile, Text)>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      return #err(#NotAuthorized);//isNotAuthorized
    };
    let rsReadUser = state.profiles.get(caller);
    switch (rsReadUser) {
      case null{
        #err(#NotFound);
      };
      case (? v) {
        let updateInfo : Types.Profile = {
          user = v.user;
          wallets = ?[wallet_id];
        };
        let rs = state.profiles.replace(caller, updateInfo);
        #ok((updateInfo, Principal.toText(caller)));
      }
    }
  };

  // TravelPlan
  public shared({caller}) func createTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Response<(Text,Text)>{
    var tp_temp : Int = 0;

    if(Principal.toText(caller) == "2vxsx-fae") {
      return #err(#NotAuthorized);//isNotAuthorized
    };

    for((K,V) in state.travelplans.entries()) {
      if(
        Principal.toText(V.uid) == Principal.toText(caller) and
        travel_plan.travel_plan.week_of_year == V.travel_plan.week_of_year
      ) {
        tp_temp := tp_temp + 1;
      }
    };

    //check tp of user (uid,idtime)
    //if !idtime -> create a new
    //else check how many
      //if 2 AlreadyExisting va tra error
      //if 1
        //check if current time of week or not

    if(tp_temp < 2) {
      let plan : Types.TravelPlan = {
        uid = caller;
        travel_plan = travel_plan.travel_plan;
        is_received = true;
        created_at = Time.now();
      };

      switch (state.profiles.get(caller)) {
        case null{
          #err(#NotFound);
        };
        case (?profile) {
          state.travelplans.put(travel_plan.idtp, plan);
          switch (await isKYCedUser(caller)) {
            case (false) {
              #ok((travel_plan.idtp, "non-KYC"));
            };
            case (true) {
              let toAddress = Option.get(profile.wallets, [""])[0];
              let res = await transfer({ e8s = 100 }, toAddress);
              await recordTransaction(
                caller, { e8s = 100 }, toAddress, "TravelPlan", travel_plan.idtp, res, null
              );
              #ok((travel_plan.idtp,""));
            };
          };
        };
      };
    } else {
      #err(#Enough);
    }
  };

  public shared({caller}) func updateTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Response<()>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    let rsReadTP = state.travelplans.get(travel_plan.idtp);

    switch (rsReadTP) {
      case null{
        #err(#NotFound);
      };
      case (?v) {
        let plan : Types.TravelPlan = {
          uid = caller;
          travel_plan = travel_plan.travel_plan;
          is_received = v.is_received;
          created_at = Time.now();
        };
        let rsUpdateTP = state.travelplans.replace(travel_plan.idtp, plan);
        #ok(());
      };
    }
  };

  public shared({caller}) func setStatusReceivedICP(status : Bool, idtp: Text) : async Response<()>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      return #err(#NotAuthorized);//isNotAuthorized
    };

    let rsReadTP = state.travelplans.get(idtp);

    switch (rsReadTP) {
      case null{
        #err(#NotFound);
      };
      case (? v) {
        let plan : Types.TravelPlan = {
          uid = caller;
          travel_plan = v.travel_plan;
          is_received = status;
          created_at = v.created_at;
        };
        let rsUpdateTP = state.travelplans.replace(idtp, plan);
        #ok(());
      };
    }
  };

  public shared query({caller}) func readAllTPUser() : async Response<[(Text, Types.TravelPlan, ?Types.ProofTP)]>{
    var tps : [(Text, Types.TravelPlan, ?Types.ProofTP)] = [];

    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    for((K, V) in state.travelplans.entries()) {
      if(Principal.toText(V.uid) == Principal.toText(caller)) {
        let p = state.proofs.get(K);
        tps := Array.append<(Text, Types.TravelPlan, ?Types.ProofTP)>([(K, V, p)], tps);
      }
    };
    #ok((tps));
  };

  public shared({caller}) func createProofTP(idptp : Text, prooftp : ProofTP.ProofTP) : async Response<?Text>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    // check proof of tp already
    // if true -> exist
    // else
      // check specific_date already
      // if false -> submit
      // else
        // if start_date < current_Date < end_date
        // true -> submit
        // flase -> failed
    let findPTP = state.proofs.get(idptp);
    switch (findPTP) {
      case (? v) {
        #err(#AlreadyExisting);
      };
      case (null) {
        let findTP = state.travelplans.get(idptp);
        switch (findTP) {
          case null{
            #err(#NotFound);
          };
          case (?tp) {
            let newProof : Types.ProofTP = {
              uid = caller;
              proof = prooftp;
              status = "waitting";
              created_at = Time.now();
            };
            if(Option.get(tp.travel_plan.specific_date, false)) {
              if(
                (Option.get(tp.travel_plan.timeStart, 0) <= Time.now()/1000000000) and 
                (Time.now()/1000000000 <= Option.get(tp.travel_plan.timeEnd, 0))
              ) {
                  state.proofs.put(idptp, newProof);
                  #ok((prooftp.img_key));
              } else{
                #err(#Failed);
              };
            } else{
              state.proofs.put(idptp, newProof);
              #ok((prooftp.img_key))
            };
          };
        };
      };
    };
  };

  public shared({caller}) func readProofOfTP(idtp : Text) : async Response<Types.ProofTP>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    let proof = state.proofs.get(idtp);
    return Result.fromOption(proof, #NotFound);
  };

  // KYC
  public shared({caller}) func createKYC(kyc : Types.KYCsUpdate) : async Response<Text> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };

    let read_kyc = state.kycs.get(caller);

    switch (read_kyc) {
      case (? current_kyc) {
        if(current_kyc.status == ?"rejected") {
          let kyc_update : Types.KYCs = {
            info = kyc.info;
            images = kyc.images;
            comments = kyc.comments;
            approver: ?Principal= null;
            status = ?"waiting";
            createdAt = current_kyc.createdAt;
            updatedAt = ?Time.now();
          };
          let kyc_updated = state.kycs.replace(caller, kyc_update);
          #ok(("success"));
        }
        else { #err(#AlreadyExisting) };
      };
      case (null) {
        let new_kyc : Types.KYCs = {
          info = kyc.info;
          images = kyc.images;
          comments : ?Text = Option.get(null, ?"");
          status : ?Text = Option.get(null, ?"new");
          approver: ?Principal= null;
          createdAt : ?Int = Option.get(null, ?Time.now());
          updatedAt : ?Int = Option.get(null, ?Time.now());
        };
        let create_kyc = state.kycs.put(caller, new_kyc);
        #ok(("success"));
      };
    };
  };

  public shared query({caller}) func readKYC() : async Response<(Types.KYCs)>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };

    let read_kyc = state.kycs.get(caller);

    return Result.fromOption(read_kyc, #NotFound);
  };

  public shared query({caller}) func listKYCs() : async Response<[(Principal, Types.KYCs)]>{
    var list : [(Principal, Types.KYCs)] = [];
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    for((K, V) in state.kycs.entries()) {
      list := Array.append<(Principal, Types.KYCs)>(list, [(K, V)]);
    };
    #ok((list));
  };

  func isKYCedUser(p_user : Principal) : async Bool{
    let read_kyc = state.kycs.get(p_user);

    switch (read_kyc) {
      case null{
        return false;
      };
      case (?current_kyc) {
        if(current_kyc.status == ?"approved") {
          return true;
        } else {
          return false;
        }
      };
    };
  };

  public shared query({caller}) func getKYCStatus() : async Response<(?Text, ?Text)>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    let read_kyc = state.kycs.get(caller);

    switch (read_kyc) {
      case null{
        #err(#NotFound);
      };
      case (? current_kyc) {
        let kyc_status = current_kyc.status;
        #ok(kyc_status, current_kyc.comments);
      };
    };
  };

  public shared({caller}) func updateKYC(kyc : Types.KYCs) : async Response<()>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    let read_kyc = state.kycs.get(caller);

    switch (read_kyc) {
      case null{
        #err(#NotFound);
      };
      case (? current_kyc) {
        let kyc_update : Types.KYCs = {
          info = kyc.info;
          images = kyc.images;
          comments = kyc.comments;
          approver: ?Principal= null;
          status : ?Text = Option.get(null, ?"waiting");
          createdAt = current_kyc.createdAt;
          updatedAt = ?Time.now();
        };
        let kyc_updated = state.kycs.replace(caller, kyc_update);
        #ok(());
      };
    };
  };

  public shared({caller}) func approveKYC(kyc_status : Text, comments : Text, id : Text) : async Response<()>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_kyc = state.kycs.get((Principal.fromText(id)));

    switch (read_kyc) {
      case null{
        #err(#NotFound);
      };
      case (?current_kyc) {
        if(current_kyc.status == ?"approved") {
          #ok();
        } else{
          let kyc_update : Types.KYCs = {
            info = current_kyc.info;
            images = current_kyc.images;
            comments = ?comments;
            status = ?kyc_status;
            approver : ?Principal= ?caller;
            createdAt = current_kyc.createdAt;
            updatedAt = ?Time.now();
          };
          let kyc_updated = state.kycs.replace(Principal.fromText(id), kyc_update);
          #ok(());
        };
      };
    };
  };

  // Prizes
  private func putPrize(uuid : Text, prize : Types.Prize) : async () {
    let new_prize : Types.Prize = {
      uuid = ?uuid;
      prize_type = prize.prize_type;
      name = prize.name;
      icon = prize.icon;
      quantity = prize.quantity;
      description = prize.description;
      created_at : ?Int = Option.get(null, ?Time.now());
    };
    state.prizes.put(uuid, new_prize);
  };

  private func replacePrize(uuid : Text, prize : Types.Prize) : async () {
    let updated_prize = state.prizes.replace(uuid, prize);
  };

  public shared({caller}) func createPrize(prize : Types.Prize) : async Response<Text> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let uuid = await GeneralUtils.createUUID();
    let read_prize = state.prizes.get(uuid);
    switch (read_prize) {
      case (? V) {
        #err(#AlreadyExisting);
      };
      case (null) {
        await putPrize(uuid, prize);
        #ok(("success"));
      };
    };
  };

  public shared query({caller}) func listPrizes() : async Response<[Types.Prize]>{
    var list : [Types.Prize] = [];
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    for((_K,V) in state.prizes.entries()){
      list := Array.append<Types.Prize>(list,[V]);
    };
    #ok((list));
  };

  public shared query({caller}) func readPrize(uuid : Text) : async Response<Types.Prize>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_prize = state.prizes.get(uuid);
    return Result.fromOption(read_prize, #NotFound);
  };

  public shared({caller}) func updatePrize(uuid : Text, prize : Types.Prize) : async Response<()> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_prize = state.prizes.get(uuid);
    switch (read_prize) {
      case (?V) {
        await replacePrize(uuid, prize);
        #ok(());
      };
      case (null) {
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func deletePrize(uuid : Text) : async Response<()>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_prize = state.prizes.get(uuid);
    switch (read_prize) {
      case (?V) {
        let deleted_prize = state.prizes.delete(uuid);
        #ok(());
      };
      case (null) {
        #err(#NotFound);
      };
    };
  };

  // Lucky Wheel
  // public func test() : async Response<?Types.LuckyWheel> {}
  public shared({caller}) func checkTotalPercent(wheel : Types.LuckyWheel) : async Float {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    var total_percent : Float = 0;
    for(V in wheel.wheel_prizes.vals()) {
      total_percent += V.percentage;
    };
    return total_percent;
  }; 

  public shared({caller}) func createWheel(wheel : Types.LuckyWheelUpdate) : async Response<Text> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let uuid = await GeneralUtils.createUUID();
    let read_wheel = state.wheels.get(uuid);
    switch (read_wheel) {
      case (?V) {
        #err(#AlreadyExisting);
      };
      case (null) {
        let new_wheel : Types.LuckyWheel = {
          uuid = ?uuid;
          name = wheel.name;
          max_spin_times = wheel.max_spin_times;
          max_buy_spin_times = wheel.max_buy_spin_times;
          price_of_spin = wheel.price_of_spin;
          created_at : ?Int = Option.get(null, ?Time.now());
          updated_at : ?Int = Option.get(null, ?Time.now());
          activate = false;
          activated_at = 0;
          wheel_prizes = wheel.wheel_prizes;
        };
        let total_percent = await checkTotalPercent(new_wheel);
        Debug.print(debug_show(total_percent));
        if(total_percent <= 1) {
          let updated_wheel = state.wheels.put(uuid, new_wheel);
          #ok(("success"));
        } else {
          #err(#Failed);
        };
      };
    };
  };

  public shared query({caller}) func listWheels() : async Response<[(Text, Types.LuckyWheel)]>{
    var list : [(Text, Types.LuckyWheel)] = [];
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    for((K,V) in state.wheels.entries()) {
      list := Array.append<(Text, Types.LuckyWheel)>(list, [(K, V)]);
    };
    #ok((list));
  };

  public shared query({caller}) func readWheel(uuid: Text) : async Response<(Types.LuckyWheel)>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    return Result.fromOption(read_wheel, #NotFound);
  };

  public shared({caller}) func updateWheel(uuid: Text, wheel: Types.LuckyWheelUpdate) : async Response<Text> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    switch (read_wheel) {
      case (? V) {
        let new_wheel : Types.LuckyWheel = {
          uuid = ?uuid;
          name = wheel.name;
          max_spin_times = wheel.max_spin_times;
          max_buy_spin_times = wheel.max_buy_spin_times;
          price_of_spin = wheel.price_of_spin;
          created_at = V.created_at;
          updated_at = ?Time.now();
          activate = false;
          activated_at = 0;
          wheel_prizes = wheel.wheel_prizes;
        };
        let total_percent = await checkTotalPercent(new_wheel);
        if(total_percent <= 1) {
          let updated_wheel = state.wheels.replace(uuid, new_wheel);
          #ok(("success"));
        } else {
          #err(#Failed);
        };
      };
      case (null) {
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func deleteWheel(uuid: Text) : async Response<Text>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    switch (read_wheel) {
      case (? V) {
        let deleted_wheel = state.wheels.delete(uuid);
        #ok(("success"));
      };
      case (null) {
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func activateWheel(uuid: Text) : async Response<()>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    switch (read_wheel) {
      case (? curr_wheel) {
        for((K,V) in state.wheels.entries()) {
          if(K == uuid) {
            let new_wheel : Types.LuckyWheel = {
              uuid = ?uuid;
              name = V.name;
              max_spin_times = V.max_spin_times;
              max_buy_spin_times = V.max_buy_spin_times;
              price_of_spin = V.price_of_spin;
              created_at = V.created_at;
              updated_at = V.updated_at;
              activate = true;
              activated_at = Time.now();
              wheel_prizes = V.wheel_prizes;
            };
            let updated_wheel = state.wheels.replace(K, new_wheel);
          } else {
            let new_wheel : Types.LuckyWheel = {
              uuid = ?uuid;
              name = V.name;
              max_spin_times = V.max_spin_times;
              max_buy_spin_times = V.max_buy_spin_times;
              price_of_spin = V.price_of_spin;
              created_at = V.created_at;
              updated_at = V.updated_at;
              activate = false;
              activated_at = 0;
              wheel_prizes = V.wheel_prizes;
            };
            let updated_wheel = state.wheels.replace(K, new_wheel);
          };
        };
        #ok(());
      };
      case (null) {
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func deactivateWheel(uuid : Text) : async Response<()>{
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    switch (read_wheel) {
      case (? V) {
        if(V.activate == true) {
          let new_wheel : Types.LuckyWheel = {
            uuid = ?uuid;
            name = V.name;
            max_spin_times = V.max_spin_times;
            max_buy_spin_times = V.max_buy_spin_times;
            price_of_spin = V.price_of_spin;
            created_at = V.created_at;
            updated_at = V.updated_at;
            activate = false;
            activated_at = 0;
            wheel_prizes = V.wheel_prizes;
          };
          let updated_wheel = state.wheels.replace(uuid, new_wheel);
          #ok(());
        } else {
          #err(#Failed);
        };
      };
      case (null) {
        #err(#NotFound);
      };
    };
  };

  public query func currentWheelPrizes() : async Response<[Types.Prize]>{
    var list : [Types.Prize] = [];
    var activated_wheel = LuckyWheel.activatedWheel(state);
    switch (activated_wheel) {
      case null {};
      case (? wheel) {
        for (p in wheel.wheel_prizes.vals()) {
          var prize = state.prizes.get(p.prize_id);
          switch (prize) {
            case null {};
            case (? prize) { list := Array.append<Types.Prize>(list, [prize]); };
          };
        };
      };
    };
    #ok((list));
  };

  public shared({caller}) func remainingSpinTimes() : async Int {
    var remaining_spin_times : Int = 0;
    if(Principal.toText(caller) == "2vxsx-fae") {
      return 0;
    };

    let kycOfUser : Bool = await isKYCedUser(caller);
    switch (kycOfUser) {
      case (false) {
        return 0;
      };
      case (true) {
        var activated_wheel = LuckyWheel.activatedWheel(state);
        switch (activated_wheel) {
          case null {
            return 0;
          };
          case (? wheel) {
            LuckyWheel.remainingSpinTimes(Principal.toText(caller), state, wheel.max_spin_times);
          };
        };
      };
    };
  };

  public shared({caller}) func spinLuckyWheel() : async Response<Types.SpinResultSerializer> {
    if(Principal.toText(caller) == "2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };

    let kycOfUser : Bool = await isKYCedUser(caller);
    switch (kycOfUser) {
      case (false) {
        #err(#NonKYC);
      };
      case (true) {
        let profile = state.profiles.get(caller);
        switch (profile) {
          case (null) #err(#NotFound);
          case (?profile) {
            var activated_wheel = LuckyWheel.activatedWheel(state);
            switch (activated_wheel) {
              case (? wheel) {
                let remaining_spin_times = LuckyWheel.remainingSpinTimes(
                  Principal.toText(caller), state, wheel.max_spin_times);
                if(remaining_spin_times == 0) {
                  return #err(#Unavailable);
                };
                let uid = Principal.toText(caller);
                let prizes = LuckyWheel.availablePrizes(uid, wheel.wheel_prizes, state, wheel.uuid);
                var tempArray : [Float] = [];
                // Getting percentages from wheel's prizes and append each of them into a temp array
                for (prize in prizes.vals()) {
                  tempArray := Array.append<Float>(tempArray,[prize.percentage]);
                };

                // Creating array that contains cumulative weights 
                var i = 1;
                var weight = tempArray[0];
                var cumulativeWeights : [Float] = [];
                cumulativeWeights := Array.append<Float>(cumulativeWeights,[weight]);

                // and caculating weights based on its values
                while(i < tempArray.size()) {
                  weight += tempArray[i];
                  cumulativeWeights := Array.append<Float>(cumulativeWeights,[weight]);
                  i += 1;
                };
                let maxCumulativeWeight = cumulativeWeights[cumulativeWeights.size() - 1];

                let randomNumber = await GeneralUtils.getRandomNumber(1.0);
                // Getting the random percentage in a range of [0...sum(weights)]
                let randomPercentage = maxCumulativeWeight * randomNumber;

                var itemIndex = 0;
                // Picking the random item based on its weight
                // The items with higher weight will be picked more often
                var lucky_prize : ?Types.LuckyWheelPrize = null;
                while(itemIndex < cumulativeWeights.size()) {
                  if(cumulativeWeights[itemIndex] >= randomPercentage) {
                    lucky_prize := ?prizes[itemIndex];
                    itemIndex += cumulativeWeights.size();
                  };
                  itemIndex += 1;
                };

                let prize = switch (lucky_prize) {
                  case (null) {
                    LuckyWheel.defaultWastedPrize(state);
                  };
                  case (?lp) {
                    state.prizes.get(lp.prize_id);
                  };
                };

                switch (prize) {
                  case (null) {
                    #err(#Unavailable);
                  };
                  case (?prize) {
                    // Get prize key to store spin result and award to user
                    let uuid = await GeneralUtils.createUUID();
                    Debug.print(debug_show(prize));
                    let spin_result : Types.SpinResult = {
                      uid = uid;
                      lucky_wheel_id = wheel.uuid;
                      prize_id = prize.uuid;
                      prize_name = prize.name;
                      prize_type = prize.prize_type;
                      prize_amount = prize.quantity;
                      state = "completed";
                      remark = ?prize.description;
                      created_at : Int = Time.now();
                      updated_at : ?Int = Option.get(null,?Time.now()); 
                    };
                    state.spinresults.put(uuid, spin_result);
                    let result_formated : Types.SpinResultSerializer = {
                      uuid = uuid;
                      prize_name = prize.name;
                      icon = prize.icon;
                      remark = ?prize.description;
                    };
                    if (prize.prize_type == "TriipCredit") {
                      // Reward ICP to User
                      let amount = Int64.toNat64(Float.toInt64(prize.quantity));
                      let toAddress = Option.get(profile.wallets,[""])[0];
                      let res = await transfer({ e8s = amount }, toAddress);
                      await recordTransaction(
                        caller, { e8s = amount }, toAddress, "LuckyWheelPrize", uuid, res, null
                      );
                      #ok(result_formated);
                    } else {
                      #ok(result_formated);
                    };
                  };
                };
              };
              case (null) {
                #err(#Unavailable);
              };
            };
          };
        };
      };
    };
  };

  // Spin Result
  public shared query({caller}) func listSpinResults() : async Response<[Types.SpinResultSerializer]>{
    var list : [Types.SpinResultSerializer] = [];
    let uid = Principal.toText(caller);
    if(uid=="2vxsx-fae") {
      throw Error.reject("NotAuthorized");  //isNotAuthorized
    };
    for((id, result) in state.spinresults.entries()) {
      if(result.uid == uid) {
        let prize = state.prizes.get(Option.get(result.prize_id, ""));
        let icon = switch (prize) {
          case null { "https://triip.imgix.net/triipme/prize/icon/12/triipmiles.jpg"; };
          case (? prize) { prize.icon; };
        };
        let result_serializer : Types.SpinResultSerializer = {
          uuid = id;
          prize_name = result.prize_name;
          icon = icon;
          remark = result.remark;
        };
        list := Array.append<Types.SpinResultSerializer>(list, [result_serializer]);
      };
    };
    #ok((list));
  };
  // /* MemoryCard */
  // //Adding a level to the memory card game.
  // public shared({caller}) func gameGcAddLevel() : async Response<()>{
  //   if(Principal.toText(caller) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };
  //   let is_admin = isAdmin(caller);
  //   switch (is_admin) {
  //     case (null) #err(#AdminRoleRequired);
  //     case (? v) {
  //       let levelsSize : Nat = Iter.size(state.games.memory_card.levels.keys());
  //       if(Nat.equal(levelsSize, 0)) {
  //         let levels = await MemoryCardController.initLevels();
  //         for ((K, V) in Iter.fromArray(levels)) {
  //           state.games.memory_card.levels.put(K, V);
  //         };
  //       };
  //       #ok(());
  //     };
  //   };
  // };
  // public query func gameGcGetLevel(key : Text) : async Response<Types.MemoryCardLevel>{
  //   let level : ?Types.MemoryCardLevel = state.games.memory_card.levels.get(key);
  //   switch (level) {
  //     case null{
  //       #err(#NotFound);
  //     };
  //     case (?currentLevel) {
  //       #ok((currentLevel));
  //     };
  //   }
  // };
  // public query func gameGcGetAllLevel() : async Response<[Text]>{
  //   #ok((Iter.toArray(state.games.memory_card.levels.keys())));
  // };

  // //check player is exist in current_day
  // public query({caller}) func gameGcGetPlayer(player_id : ?Text) : async ?(Text, Types.MemoryCardPlayer) {
  //   if(Principal.toText(caller) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };
  //   switch (player_id) {
  //     case null{
  //       let players = state.games.memory_card.players.entries();
  //       var p : ?(Text, Types.MemoryCardPlayer) = null;
  //       for((K, player) in players) {
  //         if(
  //           Int.greater(Moment.diff(?player.createdAt), 0) and
  //           Principal.equal(player.uid, caller)
  //         ) {
  //           p := ?(K, player);
  //         }
  //       };
  //       return p;
  //     };
  //     case (? id) {
  //       let player = state.games.memory_card.players.get(id);
  //       switch (player) {
  //         case null return null;
  //         case (?p) return ?(id, p);
  //       }
  //     };
  //   }
  // };
  // private func gameGcPutPlayer(
  //   uid : Principal, 
  //   turn : Nat,
  //   timing_play : Float, 
  //   level : Text
  // ) : async () {
  //   let uuid = await GeneralUtils.createUUID();
  //   let player : Types.MemoryCardPlayer = {
  //     uid;
  //     history = [{
  //       level;
  //       turn;
  //       timing_play;
  //     }];
  //     createdAt = Moment.now();
  //     updatedAt = Moment.now();
  //   };
  //   state.games.memory_card.players.put(uuid, player);
  // };
  // private func gameGcReplacePlayer(
  //   player_id : Text,
  //   turn : Nat, 
  //   timing_play : Float, 
  //   level : Text, 
  //   old_data : Types.MemoryCardPlayer
  // ) : async () {
  //   let newHistory = Array.append(old_data.history, [{
  //     level;
  //     turn;
  //     timing_play;
  //   }]);
  //   let replacePlayer : Types.MemoryCardPlayer = {
  //     uid = old_data.uid;
  //     history = newHistory;
  //     createdAt = old_data.createdAt;
  //     updatedAt = Moment.now();
  //   };
  //   let rs = state.games.memory_card.players.replace(player_id, replacePlayer)
  // };

  // public shared({caller = uid}) func gameGcSetPlayer({ 
  //   player_id : ?Text; 
  //   turn : Nat; 
  //   timing_play : Float; 
  //   level : Text
  // }) : async Response<()>{
  //   if(Principal.toText(uid) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };
  //   switch (player_id) {
  //     case null {
  //       //first time - level 1
  //       await gameGcPutPlayer(uid, turn, timing_play, level);
  //       #ok(());
  //     };
  //     case (? id) {
  //       let playerGet = await gameGcGetPlayer(?id);
  //       switch (playerGet) {
  //         case null {
  //           #err(#NotFound);
  //         };
  //         case (? (K, old_data)) {
  //           //level 2,3
  //           await gameGcReplacePlayer(id, turn, timing_play, level, old_data);
  //           #ok(());
  //         }
  //       }
  //     }
  //   };
  // };
  // public query func gameGcListOfDay() : async Response<[?Types.MemoryCardPlayer]>{
  //   var listTop : [?Types.MemoryCardPlayer] = [];
  //   for((K, V) in state.games.memory_card.players.entries()) {
  //     if(
  //       Int.greater(Moment.diff(?V.createdAt), 0) and
  //       // Nat.lessOrEqual(Iter.size(Iter.fromArray(listTop)),10) and
  //       Iter.size(Iter.fromArray(V.history)) == 3
  //     ) {
  //       listTop := Array.append(listTop, [?V]);
  //     }
  //   };
  //   #ok(listTop);
  // };
  // public query func gameGcListOfYesterday() : async Response<[?(Text, Types.MemoryCardPlayer)]>{
  //   var listTop : [?(Text,Types.MemoryCardPlayer)] = [];
  //   for((K, V) in state.games.memory_card.players.entries()) {
  //     if(
  //       Moment.between(V.createdAt) and
  //       Iter.size(Iter.fromArray(V.history)) == 3
  //     ) {
  //       listTop := Array.append(listTop, [?(K, V)]);
  //     }
  //   };
  //   #ok(listTop);
  // };
  // public query({caller}) func gameGcListAll() : async Response<[(Types.MemoryCardPlayer)]>{
  //   if(Principal.toText(caller) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };
  //   let is_admin = isAdmin(caller);
  //   switch (is_admin) {
  //     case (null) #err(#AdminRoleRequired);
  //     case (? v) {
  //       #ok(Iter.toArray(state.games.memory_card.players.vals()));
  //     }
  //   }
  // };
  // public query func gameGcCheckReward(id : Text) : async Response<?Types.MemoryCardReward>{
  //   #ok(state.games.memory_card.rewards.get(id));
  // };
  // public shared({caller}) func gameGcReward(
  //   playerId : Text, 
  //   reward : Float, 
  //   uid : Principal
  // ) : async Response<()>{
  //   if(Principal.toText(caller) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };
  //   if(isAdmin(caller) == null) {
  //     return #err(#AdminRoleRequired);
  //   };
  //   let rewardAmount : Nat64 = Int64.toNat64(Float.toInt64(reward * 10**8));

  //   let recordReward = {
  //     reward : Nat64 = rewardAmount;
  //     createdAt = Moment.now();
  //   };
  //   state.games.memory_card.rewards.put(playerId, recordReward); //put to state rewards
  //   // let kycOfUser : Bool = await isKYCedUser(uid); //check user is user Kyc-ed
  //   // switch (kycOfUser) {
  //   //   case (false) {
  //   //     #err(#NonKYC);
  //   //   };
  //   //   case (true) {
  //   switch (state.profiles.get(uid)) {
  //     case null{
  //       #err(#NotFound);
  //     };
  //     case (? profile) {
  //       let toAddress = Option.get(profile.wallets, [""])[0];
  //       let res = await transfer({ e8s = rewardAmount }, toAddress);
  //       await recordTransaction(
  //         caller, { e8s = rewardAmount }, toAddress, "GameCardReward", playerId, res, null
  //       );
  //       #ok(());
  //     };
  //   };
  //   //   };
  //   // };
  // };
  // //Game memory card Engine
  // private func gameGcEnginePutPlayer(
  //   uid : Principal, 
  //   turn : Nat,
  //   timing_play : Float, 
  // ) : async (){
  //   let uuid = await GeneralUtils.createUUID();
  //   let player : Types.MemoryCardEnginePlayer = {
  //     uid;
  //     turn;
  //     timing_play;
  //     createdAt = Moment.now();
  //     updatedAt = Moment.now();
  //   };
  //   state.games.memory_card_engine.players.put(uuid, player);
  // };
  // public query({caller}) func gameGcEngineGetPlayer() : async ?(Text, Types.MemoryCardEnginePlayer) {
  //   if(Principal.toText(caller) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };
  //   let players = state.games.memory_card_engine.players.entries();
  //   var p : ?(Text, Types.MemoryCardEnginePlayer) = null;
  //   for((K, player) in players) {
  //     if(
  //       Int.greater(Moment.diff(?player.createdAt), 0) and
  //       Principal.equal(player.uid, caller)
  //     ) {
  //       p := ?(K, player);
  //     }
  //   };
  //   return p;
  // };
  // public shared({caller = uid}) func gameGcEngineSetPlayer({
  //   turn : Nat; 
  //   timing_play : Float; 
  // }) : async Response<()>{
  //   if(Principal.toText(uid) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };
  //   await gameGcEnginePutPlayer(uid, turn, timing_play);
  //   #ok(());
  // };
  // public func gameGcEngineCheckReward(id : Text) : async Response<?Types.MemoryCardEngineReward>{
  //   #ok(state.games.memory_card_engine.rewards.get(id));
  // };
  // public shared({caller}) func gameGcEngineReward(
  //   player_id : Text, 
  //   reward : Float, 
  //   uid : Principal
  // ) : async Response<()>{
  //   if(Principal.toText(caller) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };
  //   let is_admin = isAdmin(caller);
  //   let reward_format : Nat64 = Int64.toNat64(Float.toInt64(reward * 10**8));
  //   switch (is_admin) {
  //     case (null) #err(#AdminRoleRequired);
  //     case (? v) {
  //       let record_reward = {
  //         reward : Nat64 = reward_format;
  //         createdAt = Moment.now();
  //       };
  //       state.games.memory_card_engine.rewards.put(player_id, record_reward); //put to state rewards
  //       let rsReadUser = state.profiles.get(uid); // get address Wallet of top1
  //       switch (rsReadUser) {
  //         case null{
  //           #err(#NotFound);
  //         };
  //         case (? v) {
  //           switch (await transfer({ e8s = reward_format }, Option.get(v.wallets, [""])[0])) {
  //             case (#Err(transfer)) {
  //               #err(#NotFound);
  //             };
  //             case (#Ok(transfer)) {
  //               #ok(());
  //             };
  //           };
  //         };
  //       }
  //     }
  //   }
  // };
  // public query func gameGcEngineListOfYesterday() : async Response<[?(Text, Types.MemoryCardEnginePlayer)]>{
  //   var listTop : [?(Text, Types.MemoryCardEnginePlayer)] = [];
  //   for((K, V) in state.games.memory_card_engine.players.entries()) {
  //     if(
  //       Moment.between(V.createdAt)
  //     ) {
  //       listTop := Array.append(listTop, [?(K, V)]);
  //     }
  //   };
  //   #ok(listTop);
  // };
  // public query func gameGcEngineListOfDay() : async Response<[?Types.MemoryCardEnginePlayer]>{
  //   var listTop : [?Types.MemoryCardEnginePlayer] = [];
  //   for((K, V) in state.games.memory_card_engine.players.entries()) {
  //     if(
  //       Int.greater(Moment.diff(?V.createdAt), 0)
  //       // Nat.lessOrEqual(Iter.size(Iter.fromArray(listTop)),10) and
  //     ) {
  //       listTop := Array.append(listTop, [?V]);
  //     }
  //   };
  //   #ok(listTop);
  // };
  // public query({caller}) func gameGcEngineListAll() : async Response<[(Types.MemoryCardEnginePlayer)]>{
  //   if(Principal.toText(caller) == "2vxsx-fae") {
  //     throw Error.reject("NotAuthorized");  //isNotAuthorized
  //   };     
  //   let is_admin = isAdmin(caller);
  //   switch (is_admin) {
  //     case (null) #err(#AdminRoleRequired);
  //     case (? v) {
  //       #ok(Iter.toArray(state.games.memory_card_engine.players.vals()));
  //     }
  //   }
  // };
}
