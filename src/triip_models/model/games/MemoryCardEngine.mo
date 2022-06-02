module {
  public type Player = {
    uid: Principal;
    turn : Nat;
    timing_play: Float;
    createdAt : Int;
    updatedAt : Int;
  };
  public type Reward = {
    reward : Nat64;
    createdAt : Int;
  }
}