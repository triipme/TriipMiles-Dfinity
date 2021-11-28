import Trie "mo:base/Trie";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

import Types "Types";
import State "State";

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

    system func preupgrade() {
        Debug.print("Begin preupgrade");
        profiles := Iter.toArray(state.profiles.entries());
        travelplans := Iter.toArray(state.travelplans.entries());
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
    public shared(msg) func read() : async Result.Result<?Types.Profile,Types.Error>{
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
                #ok(rsReadUser);
            };
        }
    };

    public shared(msg) func createTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Result.Result<(),Types.Error>{
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        let plan : Types.TravelPlan = {
            uid = uid;
            travel_plan = travel_plan.travel_plan;
            idtp = travel_plan.idtp;
        };

        state.travelplans.put(travel_plan.idtp,plan);

        let rsReadTP = state.travelplans.get(travel_plan.idtp);

        switch(rsReadTP){
            case null{
                #err(#NotFound);
            };
            case (? v){
                #ok(());
            };
        }
    };
    public shared(msg) func updateTravelPlan(travel_plan : Types.TravelPlanUpdate) : async Result.Result<(),Types.Error>{
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        let plan : Types.TravelPlan = {
            uid = uid;
            travel_plan = travel_plan.travel_plan;
            idtp = travel_plan.idtp;
        };

        let rsReadTP = state.travelplans.replace(travel_plan.idtp,plan);

        switch(rsReadTP){
            case null{
                #err(#NotFound);
            };
            case (? v){
                #ok(());
            };
        }
    };

    public shared(msg) func readAllTPUser() : async Result.Result<[Types.TravelPlan],Types.Error>{
        let uid = msg.caller;
        var tps : [Types.TravelPlan] = [];

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };
        
        for(val in state.travelplans.vals()){
            if(Principal.toText(val.uid) == Principal.toText(uid)){
                tps := Array.append<Types.TravelPlan>([val],tps);
            }
        };
        #ok((tps));
    };

    public shared(msg) func proofTP(idtp:Text,img_key:Text) : async Result.Result<(),Types.Error>{
        let uid = msg.caller;

        if(Principal.toText(uid)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        let findTP = state.travelplans.get(idtp);
        
        switch(findTP){
            case null{
                #err(#NotFound);
            };
            case (? v){
                // findTP.travel_plan.img_key := img_key;
                // let rs = state.travelplans.replace(idtp,findTP);
                Debug.print(debug_show(findTP));
                #ok(());
            }
        }

    }
}