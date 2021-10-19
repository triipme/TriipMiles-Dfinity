// Subscriber

import Publisher "canister:pub";

actor Subscriber {

    type Counter = {
        topic : Text;
        value : Nat;
    };

    var count : Nat = 0;

    public func init( _topic : Text) {
        Publisher.subscribe( {
            topic = _topic;
            callback = updateCount;
        } );
    };

    public func updateCount(counter : Counter) {
        count += counter.value;
    };

    public query func getCount(): async Nat {
        return count;
    }
}