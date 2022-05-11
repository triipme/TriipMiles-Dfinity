import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Float "mo:base/Float";
import Nat32 "mo:base/Nat32";
import Int64 "mo:base/Int64";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import List "mo:base/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Error "mo:base/Error";

import AId "mo:principal/blob/AccountIdentifier";

import Types "../triip_models/Types";
import State "../triip_models/State";
import Ledger "../triip_models/model/Ledger";
import ProofTP "../triip_models/model/ProofTP";

import MemoryCardController "./controllers/games/memory_card";
import UUID "./plugins/uuid";
import Moment "./plugins/moment";

import Env ".env";

shared({caller = owner}) actor class Triip() = this{
    /*------------------------ App state--------------------------- */
    var state : State.State = State.empty();

    private stable var profiles : [(Principal,Types.Profile)] = [];
    private stable var travelplans : [(Text,Types.TravelPlan)] = [];
    private stable var proofs : [(Text,Types.ProofTP)] = [];
    private stable var admin : [(Principal,Types.Admin)] = [];
    private stable var vetted : [(Text,Types.Vetted)] = [];
    private stable var kycs : [(Principal,Types.KYCs)] = [];
    private stable var games = {
        memory_card = {
            levels : [(Text,Types.MemoryCardLevel)] = [];
            players : [(Text,Types.MemoryCardPlayer)] = [];
            rewards : [(Text,Types.MemoryCardReward)] = [];
        }
    };

    system func preupgrade() {
        Debug.print("Begin preupgrade");
        profiles := Iter.toArray(state.profiles.entries());
        travelplans := Iter.toArray(state.travelplans.entries());
        proofs := Iter.toArray(state.proofs.entries());
        admin := Iter.toArray(state.admin.entries());
        vetted := Iter.toArray(state.vetted.entries());
        kycs := Iter.toArray(state.kycs.entries());
        games := {
            memory_card = {
                levels = Iter.toArray(state.games.memory_card.levels.entries());
                players = Iter.toArray(state.games.memory_card.players.entries());
                rewards = Iter.toArray(state.games.memory_card.rewards.entries());
            }
        };
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
        for ((k, v) in Iter.fromArray(games.memory_card.levels)) {
        state.games.memory_card.levels.put(k, v);
        };
        for ((k, v) in Iter.fromArray(games.memory_card.players)) {
        state.games.memory_card.players.put(k, v);
        };
        for ((k, v) in Iter.fromArray(games.memory_card.rewards)) {
        state.games.memory_card.rewards.put(k, v);
        };
        Debug.print("End postupgrade");
    };

    type MemoryCard = MemoryCardController.MemoryCardController;
    type Response<Ok> = Result.Result<Ok,Types.Error>;
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
    private func transfer(type_transfer: Text, to : Text) : async Ledger.TransferResult {
        // assert(caller == owner); //this check principal owner vs caller is Admin
        let toAId : AId.AccountIdentifier = switch(AId.fromText(to)) {
            case (#err(_)) {
                assert(false);
                loop {};
            };
            case (#ok(a)) a;
        };
        
        var amount : Ledger.ICP = {e8s=0};
        if(type_transfer=="tp") amount := {e8s = 100};
        if(type_transfer=="ptp_approve") amount := {e8s = 3300};

        await ledger.transfer({
            memo            = 1;
            amount          = amount;
            fee             = { e8s = 10_000 };
            from_subaccount = null;
            to              = toAId;
            created_at_time = null;
        });
    };

    private func transferWithPrice(price : Nat64,to: Text) : async Ledger.TransferResult{
        let toAId : AId.AccountIdentifier = switch(AId.fromText(to)) {
            case (#err(_)) {
                assert(false);
                loop {};
            };
            case (#ok(a)) a;
        };
        
        let amount : Ledger.ICP = {e8s=price};

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
    public query({caller}) func analysis() : async Response<(Analysis,[Text])>{
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
    private func isAdmin(key : Principal) : ?Types.Admin{
        let findAdmin = state.admin.get(key);
        return findAdmin;
    };
    private func isSecretKey(key : Text) : Bool{
        return Text.hash(key)==Text.hash(Env.secret_key_admin);
    };
    public query({caller}) func loginAdmin() : async Response<Types.Admin>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        
        let is_admin = isAdmin(caller);
        switch(is_admin){
            case(null) #err(#NotFound);
            case(? v) #ok((v));
        }
    };
    public shared({caller}) func registerAdmin(key : Text,info : Types.Admin) : async Response<Types.Admin>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        let isKey = isSecretKey(key);
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
        let proof = state.proofs.get(key);
        return proof;
    };
    private func getInfoStaffAdmin(key : Principal) : Text{
        let staff = state.admin.get(key);
        switch(staff){
            case(null) return "Not Found Info Staff";
            case(? v) return Text.concat(Option.get(v.admin.first_name,"")," "#Option.get(v.admin.last_name,""));
        };
    };
    private func getStaffAdmin(key : Text) : ?Types.Vetted{
        let staff = state.vetted.get(key);
        return staff;
    };
    public query({caller}) func getAllTPAdmin() : async Response<[(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)]>{
        var allTP : [(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)] = [];
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
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
    public shared({caller}) func approveHPAdmin(id_proof : Text,status:Text,proof : Types.ProofTP) : async Response<()>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        let proof_update : Types.ProofTP = {
            proof = proof.proof;
            uid = proof.uid;
            status = status;
            created_at = proof.created_at;
        };
        let vetted_data : Types.Vetted = {
            staff  = caller;
            updated_at = Time.now() / 10**9;
        };
        let proof_replace = state.proofs.replace(id_proof,proof_update);
        let vetted = state.vetted.put(id_proof,vetted_data);
        let kycOfUser : Bool = await isKYCedUser(caller);
        if(Text.equal(status,"approved")){
            let wallet_id = state.profiles.get(proof.uid);
            switch(wallet_id){
                case(null) #err(#NotFound);
                case(? v){
                    switch(kycOfUser){
                        case (false){
                            #err(#NonKYC);
                        };
                        case (true){
                            switch(await transfer("tp",Option.get(v.wallets,[""])[0])){
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
        }else{
            #ok(());
        }
    };

    /* ------------------------------------------------------------------------------------------------------- */
    // User
    // Create
    public query({caller}) func storage() : async Response<(Text,Text,Text,Text)>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };
        #ok((Env.S3_BUCKET,Env.S3_ACCESS_KEY,Env.S3_SECRET_KEY,Env.S3_REGION))
    };
    public shared({caller}) func create(profile: Types.Profile) : async Response<()> {
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
    public query({caller}) func read() : async Response<(Types.Profile,Text)>{
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
    public shared({caller}) func addWallet(wallet_id:Text) : async Response<(Types.Profile,Text)>{
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
    // public query({caller}) func addWallet(wallet_id:Text) : async Response<()>{
    //     if(Principal.toText(caller)=="2vxsx-fae"){
    //         return #err(#NotAuthorized);//isNotAuthorized
    //     };
    //     let rsReadUser = state.profiles.get(caller);
    //     switch(rsReadUser){
    //         case null{
    //             #err(#NotFound);
    //         };
    //         case (? v){
    //             if(?Array.find(Option.get(v.wallets,[]),func(rs : Text) : Bool{
    //                 rs == wallet_id
    //             }) == ?null){
    //                 let updateInfo : Types.Profile = {
    //                     user = v.user;
    //                     wallets = ?Array.append(Option.get(v.wallets,[]),[wallet_id]);
    //                 };
    //                 let rs = state.profiles.replace(caller,updateInfo);
    //                 #ok(());
    //             } else {
    //                 #err(#AlreadyExisting);
    //             }
    //         }
    //     }
    // };
    // TravelPlan
    public shared({caller}) func createTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Response<(Text,Text)>{
        var tp_temp : Int = 0;

        if(Principal.toText(caller)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        for((K,V) in state.travelplans.entries()){
            if(Principal.toText(V.uid)==Principal.toText(caller) 
                and 
                travel_plan.travel_plan.week_of_year == V.travel_plan.week_of_year){
                    tp_temp := tp_temp+1;
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
                            switch(await transfer("tp",Option.get(v.wallets,[""])[0])){
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
    public shared({caller}) func updateTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Response<()>{
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
    public shared({caller}) func setStatusReceivedICP(status : Bool,idtp: Text) : async Response<()>{
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

    public query({caller}) func readAllTPUser() : async Response<[(Text,Types.TravelPlan,?Types.ProofTP)]>{
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

    public shared({caller}) func createProofTP(idptp: Text,prooftp:ProofTP.ProofTP) : async Response<?Text>{
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

    public query({caller}) func readProofOfTP(idtp:Text) : async Response<Types.ProofTP>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };
        let proof = state.proofs.get(idtp);
        return Result.fromOption(proof,#NotFound);
    };

    // KYC
    public shared({caller}) func createKYC(kyc: Types.KYCsUpdate) : async Response<Text> {
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
                #ok(("sucess"));
            };
        };
    };

    public query({caller}) func readKYC() : async Response<(Types.KYCs)>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };    

        let read_kyc = state.kycs.get(caller);

        return Result.fromOption(read_kyc, #NotFound);
    };

    public query({caller}) func listKYCs() : async Response<[(Principal,Types.KYCs)]>{
        var list : [(Principal,Types.KYCs)] = [];
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
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

    public query({caller}) func getKYCStatus() : async Response<(?Text,?Text)>{
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

    public shared({caller}) func updateKYC(kyc : Types.KYCs) : async Response<()>{
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


    public shared({caller}) func approveKYC(kyc_status: Text,comments:Text,id:Text) : async Response<()>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
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

    /* MemoryCard */
    //Adding a level to the memory card game.
    public shared func Game__GC_addLevel() : async Response<()>{
        let mc : MemoryCard = await MemoryCardController.MemoryCardController();
        let levelsSize : Nat = Iter.size(state.games.memory_card.levels.keys());
        if(Nat.equal(levelsSize,0)){
            let levels = await mc.addLevel();
            for ((K,V) in Iter.fromArray(levels)){
                let setLevel = state.games.memory_card.levels.put(K,V);
            };
        };
        #ok(());
    };
    public query func Game__GC_getLevel(key : Text) : async Response<Types.MemoryCardLevel>{
        let level : ?Types.MemoryCardLevel = state.games.memory_card.levels.get(key);
        switch(level){
            case null{
                #err(#NotFound);
            };
            case (? current_level){
                #ok((current_level));
            };
        }
    };
    public query func Game__GC_getAllLevel() : async Response<[Text]>{
        #ok((Iter.toArray(state.games.memory_card.levels.keys())));
    };

    //check player is exist in current_day
    public query({caller}) func Game__GC_getPlayer(id_player: ?Text) : async ?(Text,Types.MemoryCardPlayer){
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };
        switch(id_player){
            case null{
                let players = state.games.memory_card.players.entries();
                var p : ?(Text,Types.MemoryCardPlayer) = null;
                for((K,player) in players){
                    if(Int.greater(Moment.diff(?player.createdAt),0) and Principal.equal(player.uid,caller)){
                        p := ?(K,player);
                    }
                };
                return p;
            };
            case(? id){
                let player = state.games.memory_card.players.get(id);
                switch(player){
                    case null return null;
                    case (?p) return ?(id,p);
                }
            };
        }
    };
    private func Game__GC_putPlayer(uid: Principal,turn : Nat,timing_play: Float,level:Text) : async (){
        let uuid : UUID.UUID = await UUID.UUID([1,0,1,0,1,0]);
        let record_player : Types.MemoryCardPlayer = {
            uid;
            history = [{
                level;
                turn;
                timing_play;
            }];
            createdAt = Moment.now();
            updatedAt = Moment.now();
        };
        state.games.memory_card.players.put(await uuid.newAsync(),record_player);
    };
    private func Game__GC_replacePlayer(id_player: Text,turn : Nat,timing_play: Float,level:Text,old_data: Types.MemoryCardPlayer) : async ?Types.MemoryCardPlayer{
        let newHistory = Array.append(old_data.history,[{
            level;
            turn;
            timing_play;
        }]);
        let record_player_new : Types.MemoryCardPlayer = {
            uid = old_data.uid;
            history = newHistory;
            createdAt = old_data.createdAt;
            updatedAt = Moment.now();
        };
        let rs = state.games.memory_card.players.replace(id_player,record_player_new);
        return rs;
    };

    public shared({caller = uid}) func Game__GC_setPlayer({id_player:?Text;turn : Nat;timing_play: Float;level:Text}) : async Response<()>{
        if(Principal.toText(uid)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };
        switch(id_player){
            case null {
                //first time - level 1
                await Game__GC_putPlayer(uid,turn,timing_play,level);
                #ok(());
            };
            case(? id){
                let playerGet = await Game__GC_getPlayer(?id);
                switch(playerGet){
                    case null {
                        #err(#NotFound);
                    };
                    case(? (K,old_data)){
                        //level 2,3
                        let rs = await Game__GC_replacePlayer(id,turn,timing_play,level,old_data);
                        #ok(());
                    }
                }
            }
        };
    };
    public query func Game__GC_listOfDay() : async Response<[?Types.MemoryCardPlayer]>{
        var listTop : [?Types.MemoryCardPlayer] = [];
        for((K,V) in state.games.memory_card.players.entries()){
            if(Int.greater(Moment.diff(?V.createdAt),0) 
                // and Nat.lessOrEqual(Iter.size(Iter.fromArray(listTop)),10) 
                and Iter.size(Iter.fromArray(V.history))==3)
            {
                listTop := Array.append(listTop,[?V]);
            }
        };
        #ok(listTop);
    };
    public query func Game__GC_listOfYesterday() : async Response<[?(Text,Types.MemoryCardPlayer)]>{
        var listTop : [?(Text,Types.MemoryCardPlayer)] = [];
        for((K,V) in state.games.memory_card.players.entries()){
            if(Moment.between(V.createdAt)
                and Iter.size(Iter.fromArray(V.history))==3)
            {
                listTop := Array.append(listTop,[?(K,V)]);
            }
        };
        #ok(listTop);
    };
    public query({caller}) func Game__GC_listAll() : async Response<[(Types.MemoryCardPlayer)]>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        
        let is_admin = isAdmin(caller);
        switch(is_admin){
            case(null) #err(#NotEnoughPermission);
            case(? v){
                #ok(Iter.toArray(state.games.memory_card.players.vals()));
            }
        }
    };
    public query func Game__GC_checkReward(id : Text) : async Response<?Types.MemoryCardReward>{
      Debug.print(id);
      #ok(state.games.memory_card.rewards.get(id));
    };
    public shared({caller}) func Game__GC_reward(id_player: Text,reward:Float,uid:Principal) : async Response<()>{
      if(Principal.toText(caller)=="2vxsx-fae"){
        throw Error.reject("NotAuthorized");//isNotAuthorized
      };        
      let is_admin = isAdmin(caller);
      let reward_format : Nat64 = Int64.toNat64(Float.toInt64(reward * 10**8));
      switch(is_admin){
        case(null) #err(#NotEnoughPermission);
        case(? v){
          let record_reward = {
            reward : Nat64 = reward_format;
            createdAt = Moment.now();
          };
          state.games.memory_card.rewards.put(id_player,record_reward); //put to state rewards
            // let kycOfUser : Bool = await isKYCedUser(uid); //check user is user Kyc-ed
            // switch(kycOfUser){
            //   case (false){
            //     #err(#NonKYC);
            //   };
            //   case (true){
              let rsReadUser = state.profiles.get(uid); // get address Wallet of top1
              switch(rsReadUser){
                case null{
                  #err(#NotFound);
                };
                case (? v){
                  switch(await transferWithPrice(reward_format,Option.get(v.wallets,[""])[0])){
                    case (#Err(transferWithPrice)){
                      #err(#NotFound);
                    };
                    case (#Ok(transferWithPrice)){
                      #ok(());
                    };
                  };
                };
              }
          //   };
          // };
        }
      }
    };
}