module {
  public type MemoryCardEngine = {
    name : Text;
    slug : Text; //unique
    description : Text;
    status : Bool;
  };
  public type Stage = {
    gameId : Text;
    name : Text;
    order : Nat;
  };
  public type Card = {
    stageId : Text;
    cardType : Text; //"text" or "image"
    data : [Text];
  };
  public type Player = {
    uid: Principal;
    history : [
      {
        stageId : Text;
        turn : Nat;
        timing: Float;
      }
    ];
    createdAt : Int;
    updatedAt : Int;
  };
  public type Reward = {
    reward : Nat64;
    createdAt : Int;
  };
}