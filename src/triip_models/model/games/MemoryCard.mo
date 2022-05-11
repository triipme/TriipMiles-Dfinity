module {
  public type Level = {
    volcabulary : [(Text,Text)];
  };

  public type Player = {
    uid: Principal;
    history : [
      {
        level : Text;
        turn : Nat;
        timing_play: Float;
      }
    ];
    createdAt : Int;
    updatedAt : Int;
  };
  public type Reward = {
    reward : Nat64;
    createdAt : Int;
  }
}