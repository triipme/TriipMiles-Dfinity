actor Calc {

  var rs : Int = 0;

  public func add(n : Int,m : Int) : async Int {
    rs := n + m;
    return rs;
  };

  public func sub(n : Int,m : Int) : async Int {
    rs := n - m;
    return rs;
  };

  public func mul(n : Int,m : Int) : async Int {
    rs := n * m;
    return rs;
  };

  public func div(n : Int,m : Int) : async ?Int {
    if (n == 0) {
      return null;
    } else {
      rs := n / m;
      return ?rs;
    };
  };

  public func clearall() : async () {
    rs := 0;
  };
};
