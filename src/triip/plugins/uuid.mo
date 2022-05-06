import UUIDGenerator "mo:uuid/UUID";
import Source "mo:uuid/Source";
import XorShift "mo:rand/XorShift";
import AsyncSource "mo:uuid/async/SourceV4";

actor class UUID(c : [Nat8]) {
  private let ae = AsyncSource.Source();
  private let rr = XorShift.toReader(XorShift.XorShift64(null));
  private let se = Source.Source(rr, c);

  public func newSync() : async Text{
    let id = se.new();
    UUIDGenerator.toText(id);
  };

  public func newAsync() : async Text{
    let id = await ae.new();
    UUIDGenerator.toText(id);
  };

}