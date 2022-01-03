import Trie "mo:base/Trie";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import List "mo:base/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Error "mo:base/Error";

import AId "mo:principal/blob/AccountIdentifier";

import Types "Types";
import State "State";
import ProofTP "model/ProofTP";
import Env ".env"

actor {
    /*------------------------ App state--------------------------- */
    var state : State.State = State.empty();

    // /*public query*/ func getState() : async State.StateShared {
    //     State.share(state)
    // };

    // /*public*/ func setState(st : State.StateShared) : async () {
    //     state := State.fromShared(st);
    // };
    private stable var profiles : [(Principal,Types.Profile)] = [];
    private stable var travelplans : [(Text,Types.TravelPlan)] = [];
    private stable var proofs : [(Text,Types.ProofTP)] = [];
    private stable var admin : [(Principal,Types.Admin)] = [];
    private stable var vetted : [(Text,Types.Vetted)] = [];

    system func preupgrade() {
        Debug.print("Begin preupgrade");
        profiles := Iter.toArray(state.profiles.entries());
        travelplans := Iter.toArray(state.travelplans.entries());
        proofs := Iter.toArray(state.proofs.entries());
        admin := Iter.toArray(state.admin.entries());
        vetted := Iter.toArray(state.vetted.entries());
        Debug.print("End preupgrade");
    };

    system func postupgrade() {
        Debug.print("Begin postupgrade");
        for((k,v) in Iter.fromArray(admin)) {
            state.admin.put(k,v);
        };
        for((k,v) in Iter.fromArray(profiles)) {
            state.profiles.put(k,v);
        };
        for((k,v) in Iter.fromArray(travelplans)) {
            state.travelplans.put(k,v);
        };
        for((k,v) in Iter.fromArray(proofs)) {
            state.proofs.put(k,v);
        };
        for((k,v) in Iter.fromArray(vetted)) {
            state.vetted.put(k,v);
        };
        Debug.print("End postupgrade");
    };
    // func require_permission(p : Principal) : () {
    //     if(Principal.toText(p)=="2vxsx-fae"){
    //         throw Error.reject("NotAuthorized");//isNotAuthorized
    //     };
    // };
    //Admin
    public shared query({caller}) func analysis() : async Result.Result<Text,Types.Error>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };
        Debug.print(debug_show(state.profiles.size()));
        Debug.print(debug_show(state.travelplans.size()));
        Debug.print(debug_show(state.proofs.size()));
        var proofs_approved : Nat = 0;
        var proofs_rejected : Nat = 0;
        let analysis = {
            profiles = state.profiles.size();
            travelplans = state.travelplans.size();
            proofs = state.proofs.size();
        };
        #ok(("hmm"));
    };
    private func isAdmin(key : Principal) : ?Types.Admin{
        let findAdmin = state.admin.get(key);
        return findAdmin;
    };
    private func isSecretKey(key : Text) : Bool{
        return Text.hash(key)==Text.hash(Env.secret_key_admin);
    };
    public shared query({caller}) func loginAdmin() : async Result.Result<Types.Admin,Types.Error>{
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        let is_admin = isAdmin(caller);
        Debug.print(debug_show(is_admin));
        switch(is_admin){
            case(null) #err(#NotFound);
            case(? v) #ok((v));
        }
    };
    public shared({caller}) func registerAdmin(key : Text,info : Types.Admin) : async Result.Result<Types.Admin,Types.Error>{
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
    private func getHPofTP_admin(key : Text) : ?Types.ProofTP{
        let proof = state.proofs.get(key);
        // switch(proof){
        //     case(null) #err(#NotFound);
        //     case(? v) #ok((key,v));
        // };
        return proof;
    };
    private func getInfoStaff_admin(key : Principal) : Text{
        let staff = state.admin.get(key);
         switch(staff){
            case(null) return "Not Found Info Staff";
            case(? v) return Text.concat(Option.get(v.admin.first_name,"")," "#Option.get(v.admin.last_name,""));
        };
    };
    private func getStaff_admin(key : Text) : ?Types.Vetted{
        let staff = state.vetted.get(key);
        return staff;
    };
    public shared query({caller}) func getAllTP_admin() : async Result.Result<[(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)],Types.Error>{
        var allTP : [(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)] = [];
        if(Principal.toText(caller)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        
        for((K,V) in state.travelplans.entries()){
            switch(getStaff_admin(K)){
                case(null){
                    switch(getHPofTP_admin(K)){
                        case(null){
                            allTP := Array.append<(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)>([(K,V,null,null,null)],allTP);
                        };
                        case(? v){
                            allTP := Array.append<(Text,Types.TravelPlan,?Types.ProofTP,?Types.Vetted,?Text)>(allTP,[(K,V,?v,null,null)]);
                        }
                    }
                };
                case(? vetted){
                    let vetted_staff = getInfoStaff_admin(vetted.staff);
                    switch(getHPofTP_admin(K)){
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
    public shared({caller}) func approveHP_admin(id_proof : Text,status:Text,proof : Types.ProofTP) : async Result.Result<?[(Text)],Types.Error>{
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
        if(Text.equal(status,"approved")){
            let wallet_id = state.profiles.get(proof.uid);
            switch(wallet_id){
                case(null) #err(#NotFound);
                case(? v){
                    #ok((v.wallets));
                }
            };
        }else{
            #ok((?[]));
        }
    };

    /* ------------------------------------------------------------------------------------------------------- */
    // User
    // Create
    public shared(msg) func create(profile: Types.Profile) : async Result.Result<(),Types.Error> {
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };
        // let profile_update : Types.Profile = {
        //     user = profile.user;
        //     wallets = ?[AId.toText(AId.fromPrincipal(uid,null))];
        // };

        // let rsCreateUser = state.profiles.put(uid,profile_update);
        let rsCreateUser = state.profiles.put(uid,profile);
        let rsReadUser = state.profiles.get(uid);

        switch(rsReadUser){
            case null{
                #err(#NotFound);
            };
            case (? v){
                #ok(());
            };
        }
    };
    public shared query(msg) func read() : async Result.Result<(Types.Profile,Text),Types.Error>{
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        let rsReadUser = state.profiles.get(uid);

        switch(rsReadUser){
            case null{
                #err(#NotFound);
            };
            case (? v){
                #ok((v,Principal.toText(uid)));
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
    // public shared({caller}) func addWallet(wallet_id:Text) : async Result.Result<(),Types.Error>{
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
    //                 Debug.print(debug_show(rs));
    //                 #ok(());
    //             } else {
    //                 #err(#AlreadyExisting);
    //             }
    //         }
    //     }
    // };
    // TravelPlan
    public shared({caller}) func createTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Result.Result<Text,Types.Error>{
        var tp_temp : Int = 0;

        if(Principal.toText(caller)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        for((K,V) in state.travelplans.entries()){
            if(Principal.toText(V.uid)==Principal.toText(caller) 
                and 
                travel_plan.travel_plan.week_of_year == V.travel_plan.week_of_year){
                    tp_temp := tp_temp+1;
                    Debug.print(debug_show("Have",V));
            }
        };
        Debug.print(debug_show(tp_temp));

        //Kiem tra tp cua user (uid,idtime)
        //neu ko co idtime phu hop thi tao moi
        //neu co kiem tra xem co bn cai
            //neu co 2 thi khong cho tao nua va tra error
            //neu co 1 thi tao tiep
                //kiem tra xem current time trong tuan hay ko

        if(tp_temp < 2){
            let plan : Types.TravelPlan = {
                uid = caller;
                travel_plan = travel_plan.travel_plan;
                is_received = false;
                created_at = Time.now();
            };
            Debug.print("T");
            state.travelplans.put(travel_plan.idtp,plan);
            #ok((travel_plan.idtp));
        } else {
            Debug.print("F");
            #err(#Enough);
        }

        // let rsReadTP = state.travelplans.get(travel_plan.idtp);

        // switch(rsReadTP){
        //     case null{
        //         #err(#NotFound);
        //     };
        //     case (? v){
        //         #ok((travel_plan.idtp));
        //     };
        // }
    };
    public shared(msg) func updateTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Result.Result<(),Types.Error>{
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        let rsReadTP = state.travelplans.get(travel_plan.idtp);


        switch(rsReadTP){
            case null{
                #err(#NotFound);
            };
            case (? v){
                let plan : Types.TravelPlan = {
                    uid = uid;
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

    public shared query(msg) func readAllTPUser() : async Result.Result<[(Text,Types.TravelPlan,?Types.ProofTP)],Types.Error>{
        let uid = msg.caller;
        var tps : [(Text,Types.TravelPlan,?Types.ProofTP)] = [];

        if(Principal.toText(uid)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        // Debug.print(debug_show(Array.filter(Iter.toArray(state.travelplans.entries()),func (key:Text,val : Types.TravelPlan) : Bool {
        //         Principal.toText(val.uid) == Principal.toText(uid);
        //     }
        // )));
        for((K,V) in state.travelplans.entries()){
            if(Principal.toText(V.uid) == Principal.toText(uid)){
                let p = state.proofs.get(K);
                tps := Array.append<(Text,Types.TravelPlan,?Types.ProofTP)>([(K,V,p)],tps);
            }
        };
        #ok((tps));
    };

    public shared(msg) func createProofTP(idptp: Text,prooftp:ProofTP.ProofTP) : async Result.Result<?Text,Types.Error>{
        let uid = msg.caller;
        if(Principal.toText(uid)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        // kiem tra proof cua tp da co hay chua
        // neu co thi tra exist
        // neu chua thi tiep tuc
            // kiem tra co specific_date hay khong
            // neu khong thi cho submit thoai mai
            // neu co thi tiep tuc
                // kiem tra start_date < current_Date < end_date
                // neu co cho submit
                // neu khong tra failed
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
                            uid = uid;
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
                            #ok((prooftp.img_key));
                        };
                    };
                };
            };
        };
    };

    public shared(msg) func readProofOfTP(idtp:Text) : async Result.Result<Types.ProofTP,Types.Error>{
        let uid = msg.caller;
        if(Principal.toText(uid)=="2vxsx-fae"){
            throw Error.reject("NotAuthorized");//isNotAuthorized
        };        
        let proof = state.proofs.get(idtp);
        return Result.fromOption(proof,#NotFound);
    };
    public shared(msg) func readAllProof() : async Result.Result<(),Types.Error>{
        Debug.print(debug_show(Iter.toArray(state.proofs.entries())));
        #ok(());
    };
}