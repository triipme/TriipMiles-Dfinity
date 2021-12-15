import Trie "mo:base/Trie";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import List "mo:base/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

import AId "mo:principal/blob/AccountIdentifier";

import Types "Types";
import State "State";
import ProofTP "model/ProofTP";

actor {
    /*------------------------ App state--------------------------- */
    var state : State.State = State.empty();

    // /*public query*/ func getState() : async State.StateShared {
    //     State.share(state)
    // };

    // /*public*/ func setState(st : State.StateShared) : async () {
    //     state := State.fromShared(st);
    // };
    stable var profiles : [(Principal,Types.Profile)] = [];
    stable var travelplans : [(Text,Types.TravelPlan)] = [];
    stable var proofs : [(Text,Types.ProofTP)] = [];

    system func preupgrade() {
        Debug.print("Begin preupgrade");
        profiles := Iter.toArray(state.profiles.entries());
        travelplans := Iter.toArray(state.travelplans.entries());
        proofs := Iter.toArray(state.proofs.entries());
        Debug.print("End preupgrade");
    };

    system func postupgrade() {
        Debug.print("Begin postupgrade");
        for((k,v) in Iter.fromArray(profiles)) {
            state.profiles.put(k,v);
        };
        for((k,v) in Iter.fromArray(travelplans)) {
            state.travelplans.put(k,v);
        };
        for((k,v) in Iter.fromArray(proofs)) {
            state.proofs.put(k,v);
        };
        Debug.print("End postupgrade");
    };
    /* ------------------------------------------------------------------------------------------------------- */
    // User
    // Create
    public shared(msg) func create(profile: Types.Profile) : async Result.Result<(),Types.Error> {
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
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
    public shared(msg) func read() : async Result.Result<(Types.Profile,Text),Types.Error>{
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };
        let rsReadUser = state.profiles.get(uid);

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
    public shared(msg) func createTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Result.Result<Text,Types.Error>{
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        let plan : Types.TravelPlan = {
            uid = uid;
            travel_plan = travel_plan.travel_plan;
            is_received = false;
        };

        state.travelplans.put(travel_plan.idtp,plan);

        let rsReadTP = state.travelplans.get(travel_plan.idtp);

        switch(rsReadTP){
            case null{
                #err(#NotFound);
            };
            case (? v){
                #ok((travel_plan.idtp));
            };
        }
    };
    public shared(msg) func updateTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Result.Result<(),Types.Error>{
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };
        let rsReadTP = state.travelplans.get(travel_plan.idtp);


        switch(rsReadTP){
            case null{
                #err(#NotFound);
            };
            case (? v){
                let plan : Types.TravelPlan = {
                    uid = uid;
                    travel_plan = travel_plan.travel_plan;
                    is_received = v.is_received;
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
                };
                let rsUpdateTP = state.travelplans.replace(idtp,plan);
                #ok(());
            };
        }
    };

    public shared(msg) func readAllTPUser() : async Result.Result<[(Text,Types.TravelPlan)],Types.Error>{
        let uid = msg.caller;
        var tps : [(Text,Types.TravelPlan)] = [];

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };
        // Debug.print(debug_show(Array.filter(Iter.toArray(state.travelplans.entries()),func (key:Text,val : Types.TravelPlan) : Bool {
        //         Principal.toText(val.uid) == Principal.toText(uid);
        //     }
        // )));
        for((K,V) in state.travelplans.entries()){
            if(Principal.toText(V.uid) == Principal.toText(uid)){
                tps := Array.append<(Text,Types.TravelPlan)>([(K,V)],tps);
            }
        };
        #ok((tps));
    };

    public shared(msg) func createProofTP(idptp: Text,prooftp:ProofTP.ProofTP) : async Result.Result<?Text,Types.Error>{
        let uid = msg.caller;
        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };
        // kiem tra proof cua tp da co hay chua
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
                            status = false;
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
            return #err(#NotAuthorized);//isNotAuthorized
        };
        
        let proof = state.proofs.get(idtp);
        return Result.fromOption(proof,#NotFound);
    };
    public shared(msg) func readAllProof() : async Result.Result<(),Types.Error>{
        Debug.print(debug_show(Iter.toArray(state.proofs.entries())));
        #ok(());
    };
}