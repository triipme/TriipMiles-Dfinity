import Trie "mo:base/Trie";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal";


actor {
    type User = {
        username : ?Text;
    };

    type Profile = {
        user : User;
        id: Principal; //Principal as id
    };

    type ProfileUpdate = {
        user : User;
    };

    type Error = {
        #NotFound;
        #AlreadyExisting;
        #NotAuthorized;
    };

    // App state
    // Principal as key(id)
    stable var profiles: Trie.Trie<Principal,Profile> = Trie.empty();

    // App interface

    // Create
    public shared(msg) func create (profile: ProfileUpdate) : async Result.Result<(),Error> {
        let callerId = msg.caller;
        Debug.print("DCCCCCCCCCCCCCCCCCCCCCCCCCC");
        Debug.print(debug_show(profile));

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

        Debug.print(debug_show(userProfile));

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
        Debug.print("DCCCCCCCCCCCCCCCCCCCCCCCCCC");
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
    public shared(msg) func update (profile: Profile) : async Result.Result<(),Error> {
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
                #err(#NotFound)
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

    private func key(x : Principal) : Trie.Key<Principal> {
        return {key = x; hash = Principal.hash(x) };
    };
}