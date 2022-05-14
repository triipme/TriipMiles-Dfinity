import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import List "mo:base/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Random "mo:base/Random";
import Float "mo:base/Float";
import Nat8 "mo:base/Nat8";
import Int "mo:base/Int";
import Int64 "mo:base/Int64";

import GeneralUtils "./utils/general";
import LuckyWheel "./luckyWheel";
import AId "mo:principal/blob/AccountIdentifier";

import Types "../triip_models/Types";
import State "../triip_models/State";
import Ledger "../triip_models/model/Ledger";
import ProofTP "../triip_models/model/ProofTP";

import Env ".env";

shared({caller = owner}) actor class Triip() = this {
  /*------------------------ App state--------------------------- */
  var state : State.State = State.empty();

  // private stable var profiles : [(Principal,Types.Profile)] = [];
  // private stable var travelplans : [(Text,Types.TravelPlan)] = [];
  // private stable var proofs : [(Text,Types.ProofTP)] = [];
  // private stable var admin : [(Principal,Types.Admin)] = [];
  // private stable var vetted : [(Text,Types.Vetted)] = [];
  // private stable var kycs : [(Principal,Types.KYCs)] = [];
  private let ledger : Ledger.Interface = actor("ryjl3-tyaaa-aaaaa-aaaba-cai");

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
    AId.fromPrincipal(p,null)
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
    let toAId : AId.AccountIdentifier = switch(AId.fromText(to)) {
      case (#err(_)) {
        assert(false);
        loop {};
      };
      case (#ok(a)) a;
    };

    await ledger.transfer({
      memo            = 1;
      amount          = amount;
      fee             = { e8s = 10_000 };
      from_subaccount = null;
      to              = toAId;
      created_at_time = null;
    });
  };

  //Admin
  type Analysis = {
    profiles : Nat;
    travelplans : Nat;
    proofs_approved : Nat;
    proofs_rejected : Nat;
  };

  public query({caller}) func analysis() : async Result.Result<(Analysis,[Text]),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    var p : Nat = state.profiles.size();
    var t : Nat = state.travelplans.size();
    var pf_approved : Nat = 0;
    var pf_rejected : Nat = 0;
    for((K,proof)in state.proofs.entries()){
      if(proof.status=="approved"){
        pf_approved+=1;
      } else {
        if(proof.status!="waitting"){
          pf_rejected+=1;
        }
      }
    };
    let destination = Iter.map(state.travelplans.vals(),
      func (t : Types.TravelPlan) : Text { Option.get(t.travel_plan.destination,"") });
    let analysis = {
      profiles = p;
      travelplans = t;
      proofs_approved = pf_approved;
      proofs_rejected = pf_rejected;
    };
    #ok((analysis,Iter.toArray(destination)));
  };

  private func isAdmin(key : Principal) : ?Types.Admin {
    state.admin.get(key);
  };

  private func isSecretKey(key : Text) : Bool {
    Text.hash(key)==Text.hash(Env.secret_key_admin);
  };

  public shared query({caller}) func loginAdmin() : async Result.Result<Types.Admin,Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    let is_admin = isAdmin(caller);
    switch(is_admin){
      case(null) #err(#NotFound);
      case(? v) #ok((v));
    }
  };

  public shared({caller}) func registerAdmin(key : Text,info : Types.Admin) : async Result.Result<Types.Admin,Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    let isKey = isSecretKey(key);
    if(isKey){
      state.admin.put(caller,info);
      let rs = isAdmin(caller);
      switch(rs){
        case(null) #err(#NotFound);
        case(? v) #ok((v));
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
    switch(staff){
      case(null) return "Not Found Info Staff";
      case(? v) return Text.concat(Option.get(v.admin.first_name,"")," "#Option.get(v.admin.last_name,""));
    };
  };

  private func getStaffAdmin(key : Text) : ?Types.Vetted{
    state.vetted.get(key);
  };

  public shared query({caller}) func getAllTPAdmin() : async Result.Result<[(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)],Types.Error>{
    var allTP : [(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)] = [];
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    for((K,V) in state.travelplans.entries()){
      switch(getStaffAdmin(K)){
        case(null){
          switch(getHPofTPAdmin(K)){
            case(null){
              allTP := Array.append<(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)>([(K,V,null,null,null)],allTP);
            };
            case(? v){
              allTP := Array.append<(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)>(allTP,[(K,V,?v,null,null)]);
            }
          }
        };
        case(? vetted){
          let vetted_staff = getInfoStaffAdmin(vetted.staff);
          switch(getHPofTPAdmin(K)){
            case(null){
              allTP := Array.append<(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)>([(K,V,null,?vetted,?vetted_staff)],allTP);
            };
            case(? v){
              allTP := Array.append<(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)>(allTP,[(K,V,?v,?vetted,?vetted_staff)]);
            }
          }
        }
      }
    };
    #ok(allTP);
  };

  public shared ({caller}) func approveHPAdmin(id_proof : Text, status:Text, proof : Types.ProofTP) : async Result.Result<(), Types.Error> {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
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
    let vetted_data : Types.Vetted = {
      staff  = caller;
      updated_at = Time.now() / 10**9;
    };
    let proof_replace = state.proofs.replace(id_proof, proof_update);
    let vetted = state.vetted.put(id_proof, vetted_data);
    let kycOfUser : Bool = await isKYCedUser(proof.uid);
    if(Text.equal(status, "approved")){
      let profile = state.profiles.get(proof.uid);
      switch(profile){
        case(null) #err(#NotFound);
        case(? v){
          switch(kycOfUser){
            case (false){
              #err(#NonKYC);
            };
            case (true){
              switch(await transfer({e8s = 3300},Option.get(v.wallets,[""])[0])){
                case (#Err(transfer)){
                  #err(#NotFound);
                };
                case (#Ok(transfer)){
                  #ok(());
                };
              };
            };
          }
        }
      };
    } else {
      #ok(());
    }
  };

  /* ------------------------------------------------------------------------------------------------------- */
  // User
  // Create
  public query({caller}) func storage() : async Result.Result<(Text,Text,Text,Text),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    #ok((Env.S3_BUCKET,Env.S3_ACCESS_KEY,Env.S3_SECRET_KEY,Env.S3_REGION))
  };

  public shared({caller}) func create(profile: Types.Profile) : async Result.Result<(),Types.Error> {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    let rsCreateUser = state.profiles.put(caller,profile);
    let rsReadUser = state.profiles.get(caller);

    switch(rsReadUser){
      case null{
        #err(#NotFound);
      };
      case (? v){
        #ok(());
      };
    }
  };

  public shared query({caller}) func read() : async Result.Result<(Types.Profile,Text),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    let rsReadUser = state.profiles.get(caller);
    switch(rsReadUser){
        case null{
          #err(#NotFound);
        };
        case (? v){
          #ok((v,Principal.toText(caller)));
        };
    }
  };

  // Wallet
  public shared({caller}) func addWallet(wallet_id:Text) : async Result.Result<(Types.Profile,Text),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      return #err(#NotAuthorized);//isNotAuthorized
    };
    let rsReadUser = state.profiles.get(caller);
    switch(rsReadUser){
      case null{
        #err(#NotFound);
      };
      case (? v){
        let updateInfo : Types.Profile = {
          user = v.user;
          wallets = ?[wallet_id];
        };
        let rs = state.profiles.replace(caller,updateInfo);
        #ok((updateInfo,Principal.toText(caller)));
      }
    }
  };

  // TravelPlan
  public shared({caller}) func createTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Result.Result<(Text,Text),Types.Error>{
    var tp_temp : Int = 0;

    if(Principal.toText(caller)=="2vxsx-fae"){
      return #err(#NotAuthorized);//isNotAuthorized
    };

    for((K,V) in state.travelplans.entries()){
      if(Principal.toText(V.uid)==Principal.toText(caller) 
        and 
        travel_plan.travel_plan.week_of_year == V.travel_plan.week_of_year) {
          tp_temp := tp_temp + 1;
      }
    };

    //check tp of user (uid,idtime)
    //if !idtime -> create a new
    //else check how many
      //if 2 AlreadyExisting va tra error
      //if 1
        //check if current time of week or not

    if(tp_temp < 2){
      let plan : Types.TravelPlan = {
        uid = caller;
        travel_plan = travel_plan.travel_plan;
        is_received = true;
        created_at = Time.now();
      };
      let kycOfUser : Bool = await isKYCedUser(caller);
      let rsReadUser : ? Types.Profile = state.profiles.get(caller);
      switch(rsReadUser){
        case null{
          #err(#NotFound);
        };
        case (? v){
          switch(kycOfUser){
            case (false){
              state.travelplans.put(travel_plan.idtp,plan);
              #ok((travel_plan.idtp,"non-KYC"));
            };
            case (true){
              switch(await transfer({e8s = 100}, Option.get(v.wallets, [""])[0])) {
                case (#Err(transfer)){
                  #err(#NotFound);
                };
                case (#Ok(transfer)){
                  state.travelplans.put(travel_plan.idtp,plan);
                  #ok((travel_plan.idtp,""));
                };
              };
            };
          };
        };
      };
    } else {
      #err(#Enough);
    }
  };

  public shared({caller}) func updateTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Result.Result<(),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    let rsReadTP = state.travelplans.get(travel_plan.idtp);

    switch(rsReadTP){
      case null{
        #err(#NotFound);
      };
      case (? v){
        let plan : Types.TravelPlan = {
          uid = caller;
          travel_plan = travel_plan.travel_plan;
          is_received = v.is_received;
          created_at = Time.now();
        };
        let rsUpdateTP = state.travelplans.replace(travel_plan.idtp,plan);
        #ok(());
      };
    }
  };

  public shared({caller}) func setStatusReceivedICP(status : Bool,idtp: Text) : async Result.Result<(),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      return #err(#NotAuthorized);//isNotAuthorized
    };

    let rsReadTP = state.travelplans.get(idtp);

    switch(rsReadTP){
      case null{
        #err(#NotFound);
      };
      case (? v){
        let plan : Types.TravelPlan = {
          uid = caller;
          travel_plan = v.travel_plan;
          is_received = status;
          created_at = v.created_at;
        };
        let rsUpdateTP = state.travelplans.replace(idtp,plan);
        #ok(());
      };
    }
  };

  public shared query({caller}) func readAllTPUser() : async Result.Result<[(Text,Types.TravelPlan,?Types.ProofTP)],Types.Error>{
    var tps : [(Text,Types.TravelPlan,?Types.ProofTP)] = [];

    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    for((K,V) in state.travelplans.entries()){
      if(Principal.toText(V.uid) == Principal.toText(caller)){
        let p = state.proofs.get(K);
        tps := Array.append<(Text,Types.TravelPlan,?Types.ProofTP)>([(K,V,p)],tps);
      }
    };
    #ok((tps));
  };

  public shared({caller}) func createProofTP(idptp: Text,prooftp:ProofTP.ProofTP) : async Result.Result<?Text,Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
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
    switch(findPTP){
      case (? v){
        #err(#AlreadyExisting);
      };
      case (null){
        let findTP = state.travelplans.get(idptp);
        switch(findTP){
          case null{
            #err(#NotFound);
          };
          case (? tp){
            let newProof : Types.ProofTP = {
              uid = caller;
              proof = prooftp;
              status = "waitting";
              created_at = Time.now();
            };
            if(Option.get(tp.travel_plan.specific_date,false)){
              if( (Option.get(tp.travel_plan.timeStart,0) <= Time.now()/1000000000 ) and 
                (Time.now()/1000000000 <= Option.get(tp.travel_plan.timeEnd,0))){
                  state.proofs.put(idptp,newProof);
                  #ok((prooftp.img_key));
              } else{
                #err(#Failed);
              };
            } else{
              state.proofs.put(idptp,newProof);
              #ok((prooftp.img_key))
            };
          };
        };
      };
    };
  };

  public shared({caller}) func readProofOfTP(idtp:Text) : async Result.Result<Types.ProofTP,Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    let proof = state.proofs.get(idtp);
    return Result.fromOption(proof,#NotFound);
  };

  // KYC
  public shared({caller}) func createKYC(kyc: Types.KYCsUpdate) : async Result.Result<Text,Types.Error> {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };

    let read_kyc = state.kycs.get(caller);

    switch(read_kyc){
      case (? current_kyc){
        if(current_kyc.status == ?"rejected"){
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
        else {#err(#AlreadyExisting)};
      };
      case (null){
        let new_kyc : Types.KYCs = {
          info = kyc.info;
          images = kyc.images;
          comments : ?Text = Option.get(null,?"");
          status : ?Text = Option.get(null,?"new");
          approver: ?Principal= null;
          createdAt : ?Int = Option.get(null,?Time.now());
          updatedAt : ?Int = Option.get(null,?Time.now());
        };
        let create_kyc = state.kycs.put(caller, new_kyc);
        #ok(("success"));
      };
    };
  };

  public shared query({caller}) func readKYC() : async Result.Result<(Types.KYCs),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };

    let read_kyc = state.kycs.get(caller);

    return Result.fromOption(read_kyc, #NotFound);
  };

  public shared query({caller}) func listKYCs() : async Result.Result<[(Principal,Types.KYCs)],Types.Error>{
    var list : [(Principal,Types.KYCs)] = [];
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    for((K,V) in state.kycs.entries()){
      list := Array.append<(Principal,Types.KYCs)>(list,[(K,V)]);
    };
    #ok((list));
  };

  func isKYCedUser(p_user : Principal) : async Bool{
    let read_kyc = state.kycs.get(p_user);

    switch(read_kyc){
      case null{
        return false;
      };
      case (? current_kyc){
        if(current_kyc.status == ?"approved"){
          return true;
        } else {
          return false;
        }
      };
    };
  };

  public shared query({caller}) func getKYCStatus() : async Result.Result<(?Text,?Text),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    let read_kyc = state.kycs.get(caller);

    switch(read_kyc){
      case null{
        #err(#NotFound);
      };
      case (? current_kyc){
        let kyc_status = current_kyc.status;
        #ok(kyc_status,current_kyc.comments);
      };
    };
  };

  public shared({caller}) func updateKYC(kyc : Types.KYCs) : async Result.Result<(),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    let read_kyc = state.kycs.get(caller);

    switch(read_kyc){
      case null{
        #err(#NotFound);
      };
      case (? current_kyc){
        let kyc_update : Types.KYCs = {
          info = kyc.info;
          images = kyc.images;
          comments = kyc.comments;
          approver: ?Principal= null;
          status : ?Text = Option.get(null,?"waiting");
          createdAt = current_kyc.createdAt;
          updatedAt = ?Time.now();
        };
        let kyc_updated = state.kycs.replace(caller, kyc_update);
        #ok(());
      };
    };
  };

  public shared({caller}) func approveKYC(kyc_status: Text,comments:Text,id:Text) : async Result.Result<(),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_kyc = state.kycs.get((Principal.fromText(id)));

    switch(read_kyc){
      case null{
        #err(#NotFound);
      };
      case (? current_kyc){
        if(current_kyc.status == ?"approved"){
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
  private func putPrize(uuid: Text, prize: Types.Prize) : async () {
    let new_prize : Types.Prize = {
      uuid = ?uuid;
      prize_type = prize.prize_type;
      name = prize.name;
      icon = prize.icon;
      quantity = prize.quantity;
      description = prize.description;
      created_at : ?Int = Option.get(null,?Time.now());
    };
    state.prizes.put(uuid, new_prize);
  };

  private func replacePrize(uuid: Text, prize: Types.Prize) : async (){
    let updated_prize = state.prizes.replace(uuid, prize);
  };

  public shared({caller}) func createPrize(prize: Types.Prize) : async Result.Result<Text,Types.Error> {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let uuid = await GeneralUtils.createUUID();
    let read_prize = state.prizes.get(uuid);
    switch(read_prize){
      case(? V){
        #err(#AlreadyExisting);
      };
      case(null){
        await putPrize(uuid, prize);
        #ok(("success"));
      };
    };
  };

  public shared query({caller}) func listPrizes() : async Result.Result<[(Text,Types.Prize)],Types.Error>{
    var list : [(Text,Types.Prize)] = [];
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    for((K,V) in state.prizes.entries()){
      list := Array.append<(Text,Types.Prize)>(list,[(K,V)]);
    };
    #ok((list));
  };

  public shared query({caller}) func readPrize(uuid: Text) : async Result.Result<Types.Prize,Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_prize = state.prizes.get(uuid);
    return Result.fromOption(read_prize, #NotFound);
  };

  public shared({caller}) func updatePrize(uuid: Text, prize: Types.Prize) : async Result.Result<(),Types.Error> {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_prize = state.prizes.get(uuid);
    switch(read_prize){
      case(? V){
        await replacePrize(uuid, prize);
        #ok(());
      };
      case(null){
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func deletePrize(uuid: Text) : async Result.Result<(),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_prize = state.prizes.get(uuid);
    switch(read_prize){
      case(? V){
        let deleted_prize = state.prizes.delete(uuid);
        #ok(());
      };
      case(null){
        #err(#NotFound);
      };
    };
  };

  // Lucky Wheel
  // public func test() : async Result.Result<?Types.LuckyWheel,Types.Error> {}
  public shared({caller}) func checkTotalPercent(wheel: Types.LuckyWheel) : async Float {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    var total_percent : Float = 0;
    for(V in wheel.wheel_prizes.vals()){
      total_percent += V.percentage;
    };
    return total_percent;
  }; 

  public shared({caller}) func createWheel(wheel: Types.LuckyWheelUpdate) : async Result.Result<Text,Types.Error> {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let uuid = await GeneralUtils.createUUID();
    let read_wheel = state.wheels.get(uuid);
    switch(read_wheel){
      case(? V){
        #err(#AlreadyExisting);
      };
      case(null){
        let new_wheel : Types.LuckyWheel = {
          uuid = ?uuid;
          name = wheel.name;
          max_spin_times = wheel.max_spin_times;
          max_buy_spin_times = wheel.max_buy_spin_times;
          price_of_spin = wheel.price_of_spin;
          created_at : ?Int = Option.get(null,?Time.now());
          updated_at : ?Int = Option.get(null,?Time.now());
          activate = false;
          activated_at = 0;
          wheel_prizes = wheel.wheel_prizes;
        };
        let total_percent = await checkTotalPercent(new_wheel);
        Debug.print(debug_show(total_percent));
        if(total_percent <= 1){
          let updated_wheel = state.wheels.put(uuid, new_wheel);
          #ok(("success"));
        } else {
          #err(#Failed);
        };
      };
    };
  };

  public shared query({caller}) func listWheels() : async Result.Result<[(Text,Types.LuckyWheel)],Types.Error>{
    var list : [(Text,Types.LuckyWheel)] = [];
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    for((K,V) in state.wheels.entries()){
      list := Array.append<(Text,Types.LuckyWheel)>(list,[(K,V)]);
    };
    #ok((list));
  };

  public shared query({caller}) func readWheel(uuid: Text) : async Result.Result<(Types.LuckyWheel),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    return Result.fromOption(read_wheel, #NotFound);
  };

  public shared({caller}) func updateWheel(uuid: Text, wheel: Types.LuckyWheelUpdate) : async Result.Result<Text,Types.Error> {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    switch(read_wheel){
      case(? V){
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
        if(total_percent <= 1){
          let updated_wheel = state.wheels.replace(uuid, new_wheel);
          #ok(("success"));
        } else {
          #err(#Failed);
        };
      };
      case(null){
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func deleteWheel(uuid: Text) : async Result.Result<Text,Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    switch(read_wheel){
      case(? V){
        let deleted_wheel = state.wheels.delete(uuid);
        #ok(("success"));
      };
      case(null){
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func activateWheel(uuid: Text) : async Result.Result<(),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    switch(read_wheel){
      case(? curr_wheel){
        for((K,V) in state.wheels.entries()){
          if(K == uuid){
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
      case(null){
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func deactivateWheel(uuid: Text) : async Result.Result<(),Types.Error>{
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    if(isAdmin(caller) == null) {
      return #err(#AdminRoleRequired);
    };
    let read_wheel = state.wheels.get(uuid);
    switch(read_wheel){
      case(? V){
        if(V.activate == true){
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
      case(null){
        #err(#NotFound);
      };
    };
  };

  public shared({caller}) func remainingSpinTimes() : async Int {
    var remaining_spin_times : Int = 0;
    if(Principal.toText(caller)=="2vxsx-fae"){
      return 0;
    };
    let read_kyc = state.kycs.get(caller);
    let kycOfUser : Bool = await isKYCedUser(caller);
    switch(kycOfUser){
      case (false){
        return 0;
      };
      case (true){
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

  public shared({caller}) func spinLuckyWheel() : async Result.Result<Types.SpinResultSerializer,Types.Error> {
    if(Principal.toText(caller)=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };

    let read_kyc = state.kycs.get(caller);
    let kycOfUser : Bool = await isKYCedUser(caller);
    switch(kycOfUser){
      case (false){
        #err(#NonKYC);
      };
      case (true){
        let profile = state.profiles.get(caller);
        switch(profile){
          case(null) #err(#NotFound);
          case(?profile) {
            let remaining_spin_times = await remainingSpinTimes();
            if(remaining_spin_times == 0) {
              return #err(#Unavailable);
            };
            var activated_wheel = LuckyWheel.activatedWheel(state);
            switch(activated_wheel){
              case(? wheel){
                let uid = Principal.toText(caller);
                let prizes = LuckyWheel.availablePrizes(uid, wheel.wheel_prizes, state, wheel.uuid);
                var tempArray : [Float] = [];
                // Getting percentages from wheel's prizes and append each of them into a temp array
                for (prize in prizes.vals()){
                  tempArray := Array.append<Float>(tempArray,[prize.percentage]);
                };

                // Creating array that contains cumulative weights 
                var i = 1;
                var weight = tempArray[0];
                var cumulativeWeights : [Float] = [];
                cumulativeWeights := Array.append<Float>(cumulativeWeights,[weight]);

                // and caculating weights based on its values
                while(i < tempArray.size()){
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
                while(itemIndex < cumulativeWeights.size()){
                  if(cumulativeWeights[itemIndex] >= randomPercentage) {
                    lucky_prize := ?prizes[itemIndex];
                    itemIndex += cumulativeWeights.size();
                  };
                  itemIndex += 1;
                };

                let prize = switch(lucky_prize) {
                  case (null) {
                    LuckyWheel.defaultWastedPrize(state);
                  };
                  case (?lp) {
                    state.prizes.get(lp.prize_id);
                  };
                };

                switch(prize) {
                  case(null) {
                    #err(#Unavailable);
                  };
                  case(?prize) {
                    // Get prize key to store spin result and award to user
                    let uuid = await GeneralUtils.createUUID();
                    Debug.print(debug_show(prize));
                    let spin_result : Types.SpinResult = {
                      uid = uid;
                      lucky_wheel_id = wheel.uuid;
                      prize_id = prize.uuid;
                      prize_name = prize.name;
                      prize_type = prize.prize_type;
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
                      Debug.print(debug_show(amount));
                      switch(await transfer({e8s = amount},Option.get(profile.wallets,[""])[0])){
                        case (#Err(transfer)){
                          state.spinresults.delete(uuid);
                          #err(#Unavailable);
                        };
                        case (#Ok(transfer)){
                          #ok(result_formated);
                        };
                      };
                    } else {
                      #ok(result_formated);
                    };
                  };
                };
              };
              case(null){
                #err(#Unavailable);
              };
            };
          };
        };
      };
    };
  };

  // Spin Result
  public shared query({caller}) func listSpinResults() : async Result.Result<[Types.SpinResultSerializer],Types.Error>{
    var list : [Types.SpinResultSerializer] = [];
    let uid = Principal.toText(caller);
    if(uid=="2vxsx-fae"){
      throw Error.reject("NotAuthorized");//isNotAuthorized
    };
    for((id, result) in state.spinresults.entries()){
      if(result.uid == uid) {
        let prize = state.prizes.get(Option.get(result.prize_id, ""));
        let icon = switch(prize) {
          case null { "https://triip.imgix.net/triipme/prize/icon/12/triipmiles.jpg"; };
          case (? prize) { prize.icon; };
        };
        let result_serializer : Types.SpinResultSerializer = {
          uuid = id;
          prize_name = result.prize_name;
          icon = icon;
          remark = result.remark;
        };
        list := Array.append<Types.SpinResultSerializer>(list,[result_serializer]);
      };
    };
    #ok((list));
  };
}
