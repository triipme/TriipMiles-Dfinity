import Trie "mo:base/Trie";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

import User "model/User";
import TravelPlan "model/TravelPlan";

actor {
    /* ------------------------- User --------------------------- */
    type Profile = {
        user : User.User;
        id: Principal; //Principal as id
    };
    type ProfileUpdate = {
        user : User.User;
    };

    /* ------------------------- TravelPlan --------------------------- */
    type TravelPlan = {
        travel_plan: TravelPlan.TravelPlanInformation;
        id:Text;
        uid:Principal;
    };

    type TravelPlanUpdate = {
        travel_plan: TravelPlan.TravelPlanInformation;
        idtp:Text;
    };

    /* ------------------------- Error --------------------------- */
    type Error = {
        #NotFound;
        #AlreadyExisting;
        #NotAuthorized;
        #SomethingWrong;
    };

    /*------------------------ App state--------------------------- */
    stable var profiles: Trie.Trie<Principal,Profile> = Trie.empty();
    stable var travelplans :Trie.Trie<Text,TravelPlan> = Trie.empty();
    
    // App interface
    
    
    /* ------------------------------------------------------------------------------------------------------- */
    // User
    // Create
    public shared(msg) func create (profile: ProfileUpdate) : async Result.Result<(),Error> {
        let callerId = msg.caller;

        //Reject AnonymousIndetity
        if(Principal.toText(callerId)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        // let profileId = next; // id current of profile
        // next += 1; //id for next profile
        
        // Associate user profile with thier principal
        let userProfile : Profile = {
            user = profile.user;
            id = callerId;
        };

        let (newProfiles, existing) = Trie.put(
            profiles,           //Target trie
            // key(profileId),     // Key
            key(callerId),
            Principal.equal,          //Equality Checker
            // profile             // insert profile
            userProfile
        );

        // If there is an orginal value, do not update
        switch(existing) {
            // If there are no matches, update profiles
            case null {
                profiles := newProfiles;
                #ok(());
            };
            // Matches pattern of type - opt Profile
            case (? v ){
                #err(#AlreadyExisting);
            };
        };
    };

    // Read
    // public func read  (profileId : Nat ) : async ?Profile {
    public shared(msg) func read () : async Result.Result<Profile,Error> {
        let callerId = msg.caller;
        //Reject AnonymousIndetity
        if(Principal.toText(callerId)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };
        
        let result = Trie.find(
            profiles,
            // key(profileId),
            key(callerId),
            Principal.equal
        );
        return Result.fromOption(result,#NotFound);
    };

    //Update
    public shared(msg) func update (profile: ProfileUpdate) : async Result.Result<(),Error> {
        let callerId = msg.caller;
        
        //Reject AnonymousIndetity
        if(Principal.toText(callerId)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        // Associate user profile with thier principal
        let userProfile : Profile = {
            user = profile.user;
            id = callerId;
        };

        let result = Trie.find(
            profiles,
            key(callerId),
            Principal.equal
        );
        switch (result) {
            //Do not allow update to profiles that haven't been create yet
            case null{
                #err(#NotFound);
            };
            case(? v){
                profiles := Trie.replace(
                    profiles,           //Target trie
                    key(callerId),     // Key
                    Principal.equal,          //Equality Checker
                    ?userProfile    
                ).0;
                #ok(());
            };
        };
    };

    //Delete
    public shared(msg) func delete () : async Result.Result<(),Error> {
    // public func delete (profileId: Nat) : async Bool {
        let callerId = msg.caller;
        
        //Reject AnonymousIndetity
        if(Principal.toText(callerId)=="2vxsx-fae"){
            return #err(#NotAuthorized);//isNotAuthorized
        };

        let result = Trie.find(
            profiles,
            key(callerId),
            Principal.equal
        );
        switch (result) {
            //Do not allow update to profiles that haven't been create yet
            case null{
                #err(#NotFound);
            };
            case(? v){
                profiles := Trie.replace(
                    profiles,           //Target trie
                    key(callerId),     // Key
                    Principal.equal,          //Equality Checker
                    null    
                ).0;
                #ok(());
            };
        };
    };
    /* ------------------------------------------------------------------------------------------------------- */
    // TravelPlan
    //Create
    public shared(msg) func createTravelPlan(travelplan : TravelPlanUpdate) : async Result.Result<(),Error>{
        let callerId = msg.caller;

        if(Principal.toText(callerId)=="2vxsx-fae"){
            return #err(#NotAuthorized);
        };

        let plan : TravelPlan = {
            travel_plan = travelplan.travel_plan;
            uid = callerId;
            id = travelplan.idtp;
        };
        
        let (newTravelPlan,status) = Trie.put(
            travelplans,
            id(travelplan.idtp),
            Text.equal,
            plan
        );

        switch(status) {
            // If there are no matches, update profiles
            case null {
                travelplans := newTravelPlan;
                let rs = Trie.find(
                    travelplans,
                    id(travelplan.idtp),
                    Text.equal);
                #ok();
            };
            // Matches pattern of type - opt Profile
            case (? v ){
                #err(#SomethingWrong);
            };
        };
    };
    public shared(msg) func updateTravelPlan(travelplan : TravelPlanUpdate) : async Result.Result<(),Error>{
        let callerId = msg.caller;
        
        if(Principal.toText(callerId)=="2vxsx-fae"){
            return #err(#NotAuthorized);
        };

        let plan : TravelPlan = {
            id = travelplan.idtp;
            uid = callerId;
            travel_plan = travelplan.travel_plan;
        };
        
        let rs = Trie.find(
            travelplans,
            id(travelplan.idtp),
            Text.equal,
        );

        switch(rs) {
            // If there are no matches, update profiles
            case null {
                #err(#NotFound);
            };
            // Matches pattern of type - opt Profile
            case (? v ){
                travelplans := Trie.replace(
                    travelplans,
                    id(travelplan.idtp),
                    Text.equal,
                    ?plan
                ).0;
                #ok(());
            };
        };
    };

    private func key(x : Principal) : Trie.Key<Principal> {
        return {key = x; hash = Principal.hash(x) };
    };
    private func id(x : Text) : Trie.Key<Text>{
        return {key = x; hash = Text.hash(x)};
    }
}