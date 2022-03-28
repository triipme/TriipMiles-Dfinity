import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

import Types "Types";
import State "State";
import Ledger "model/Ledger";

actor TriipModels {
  /*------------------------ App state--------------------------- */
  var state: State.State = State.empty();

  private stable var profiles : [(Principal, Types.Profile)] = [];
  private stable var travelplans : [(Text, Types.TravelPlan)] = [];
  private stable var proofs : [(Text, Types.ProofTP)] = [];
  private stable var admin : [(Principal, Types.Admin)] = [];
  private stable var vetted : [(Text, Types.Vetted)] = [];
  private stable var kycs : [(Principal, Types.KYCs)] = [];
  private let ledger : Ledger.Interface = actor("ryjl3-tyaaa-aaaaa-aaaba-cai");

  system func preupgrade() {
    Debug.print("Begin preupgrade");
    profiles := Iter.toArray(state.profiles.entries());
    travelplans := Iter.toArray(state.travelplans.entries());
    proofs := Iter.toArray(state.proofs.entries());
    admin := Iter.toArray(state.admin.entries());
    vetted := Iter.toArray(state.vetted.entries());
    kycs := Iter.toArray(state.kycs.entries());
    Debug.print("End preupgrade");
  };

  system func postupgrade() {
    Debug.print("Begin postupgrade");
    for ((k, v) in Iter.fromArray(admin)) {
      state.admin.put(k, v);
    };
    for ((k, v) in Iter.fromArray(profiles)) {
      state.profiles.put(k, v);
    };
    for ((k, v) in Iter.fromArray(travelplans)) {
      state.travelplans.put(k, v);
    };
    for ((k, v) in Iter.fromArray(proofs)) {
      state.proofs.put(k, v);
    };
    for ((k, v) in Iter.fromArray(vetted)) {
      state.vetted.put(k, v);
    };
    for ((k, v) in Iter.fromArray(kycs)) {
      state.kycs.put(k, v);
    };
    Debug.print("End postupgrade");
  };
}
