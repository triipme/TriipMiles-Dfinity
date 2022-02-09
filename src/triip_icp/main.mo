import Array "mo:base/Array";
import Binary "mo:encoding/Binary";
import Blob "mo:base/Blob";
import CRC32 "mo:hash/CRC32";
import Principal "mo:base/Principal";
import AId "mo:principal/blob/AccountIdentifier";
import Debug "mo:base/Debug";
import Text "mo:base/Text";

import Ledger "Ledger";

shared({caller = owner}) actor class ICP() = this {
    private let ledger : Ledger.Interface = actor("ryjl3-tyaaa-aaaaa-aaaba-cai");

    public query func accountId() : async Text {
        AId.toText(aId());
    };

    public shared({caller}) func accountIdP() : async Text {
        Debug.print(debug_show(caller));
        AId.toText(principalToAid(caller));
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

    public func transfer(type_transfer: ?Text, to : Text) : async Ledger.TransferResult {
        // Debug.print(debug_show(caller,owner));
        // assert(caller == owner); //this check principal owner vs caller is Admin
        let toAId : AId.AccountIdentifier = switch(AId.fromText(to)) {
            case (#err(_)) {
                assert(false);
                loop {};
            };
            case (#ok(a)) a;
        };
        
        var amount : Ledger.ICP = {e8s=0};

        switch(type_transfer){
            case (null) {
            };
            case (?v){
                if(v=="tp") amount := {e8s = 100};
                if(v=="ptp_approve") amount := {e8s = 3300};
            }
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
    public func transferAll(amountAgr : Nat64,to : Text) : async Ledger.TransferResult {
        // Debug.print(debug_show(caller,owner));
        // assert(caller == owner); //this check principal owner vs caller is Admin
        let toAId : AId.AccountIdentifier = switch(AId.fromText(to)) {
            case (#err(_)) {
                assert(false);
                loop {};
            };
            case (#ok(a)) a;
        };
        
        var amount : Ledger.ICP = {e8s=amountAgr};

        await ledger.transfer({
            memo            = 1;
            amount          = amount;
            fee             = { e8s = 10_000 };
            from_subaccount = null;
            to              = toAId;
            created_at_time = null;
        });
    };
};
