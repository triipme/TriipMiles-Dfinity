import Int "mo:base/Int";
import Text "mo:base/Text";
import Array "mo:base/Array";

import Moment "./utils/moment";

import Types "../triip_models/Types";
import State "../triip_models/State";

module LuckyWheel {
  public func remainingSpinTimes(uid : Text, state : State.State, max_spin_times : Int) : Int {
    var today_results : [Types.SpinResult] = [];
    var extra_times = 0;
    let beginning_of_day = Moment.beginningOfDay();
    for ((id, result) in state.spinresults.entries()) {
      if (result.uid == uid and Int.greaterOrEqual(result.created_at, beginning_of_day)) {
        today_results := Array.append<Types.SpinResult>(today_results, [result]);
        if (result.prize_type == "ExtraSpin") {
          extra_times += 1;
        };
      };
    };
    max_spin_times + extra_times - today_results.size();
  };

  public func activatedWheel(state : State.State) : ?Types.LuckyWheel {
    for((K,V) in state.wheels.entries()){
      if(V.activate == true){
        return state.wheels.get(K);
      };
    };
    null;
  };
};
