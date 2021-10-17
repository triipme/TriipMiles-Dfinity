actor Counter {

  stable var counter = 0;

  // Get the value of the counter.
  public query func get() : async Nat {
    return counter;
  };

  // Set the value of the counter.
  public func set(n : Nat) : async Nat {
    counter := n;
    return counter;
  };

  // Increment the value of the counter.
  public func inc() : async Nat {
    counter += 1;
    return counter;
  };
};