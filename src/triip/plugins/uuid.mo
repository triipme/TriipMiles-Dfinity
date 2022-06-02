import UUIDGenerator "mo:uuid/UUID";
import Source "mo:uuid/Source";
import XorShift "mo:rand/XorShift";
import AsyncSource "mo:uuid/async/SourceV4";
import Cycles "mo:base/ExperimentalCycles";
import Nat64 "mo:base/Nat64";

actor class UUID(c : [Nat8]) {
  private var capacity = 100000000000;
  private var balance = Cycles.balance();
  private let ae = AsyncSource.Source();
  private let rr = XorShift.toReader(XorShift.XorShift64(null));
  private let se = Source.Source(rr, c);

  // Returns the cycles received up to the capacity allowed
  public func wallet_receive() : async { accepted: Nat64 } {
    let amount = Cycles.available();
    let limit : Nat = capacity - balance;
    let accepted = 
      if (amount <= limit) amount
      else limit;
    let deposit = Cycles.accept(accepted);
    assert (deposit == accepted);
    balance += accepted;
    { accepted = Nat64.fromNat(accepted) };
  };

  public func newSync() : async Text{
    let id = se.new();
    UUIDGenerator.toText(id);
  };

  public func newAsync() : async Text{
    let id = await ae.new();
    UUIDGenerator.toText(id);
  };
}