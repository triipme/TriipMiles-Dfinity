module {
  public type Level = {
    volcabulary : [(Text,Text)];
  };

  public type Player = {
    current_level : Text;
    score : Nat;
    turn : Nat;
    history : [
      (Nat,Int) //turn,time
    ]
  };
}