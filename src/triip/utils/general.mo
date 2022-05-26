import Random "mo:base/Random";
import Float "mo:base/Float";
import Nat8 "mo:base/Nat8";
import UUID "mo:uuid/UUID";
import AsyncSource "mo:uuid/async/SourceV4";

module GeneralUtils {
  public func createUUID() : async Text {
    var ae = AsyncSource.Source();
    let id = await ae.new();
    UUID.toText(id);
  };

  public  func getRandomNumber(max: Float) : async Float {
    assert (max > 0 and max <= 100);
    // get random blob
    var blob = await Random.blob();
    // random Nat8 in range [0..255]
    var random = Random.byteFrom(blob);
    // convert Nat8 to Float
    var randomFloat = Float.fromInt(Nat8.toNat(random));
    var maxRange : Float = 255;
    return (randomFloat / maxRange) * max;
  };
}
