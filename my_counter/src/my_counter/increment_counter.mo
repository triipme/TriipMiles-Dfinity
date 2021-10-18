// Create a simple Counter actor
actor Counter {
    stable var currentValue : Nat = 0;

    // Increment the counter with the increment function.
    public func increment() :  async (){
        currentValue += 1;
    };

    // Read the current value with get func
    public query func get() : async Nat {
        currentValue
    };

    // Write an arbitrary value with a set func
    public func set(number : Nat) : async (){
        currentValue := number;
    }

}
