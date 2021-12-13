import Array "mo:base/Array";
import Binary "mo:encoding/Binary";
import Blob "mo:base/Blob";
import CRC32 "mo:hash/CRC32";
import Principal "mo:base/Principal";
import AId "mo:principal/blob/AccountIdentifier";
import Debug "mo:base/Debug";

import Ledger "Ledger";

shared({caller = owner}) actor class ICP() = this {
    private let ledger : Ledger.Interface = actor("ryjl3-tyaaa-aaaaa-aaaba-cai");

    public func accountId() : async Text {
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

    public shared({caller}) func transfer(amount : Ledger.ICP, to : Text) : async Ledger.TransferResult {
        Debug.print(debug_show(caller,owner));
        assert(caller == owner);
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
};
