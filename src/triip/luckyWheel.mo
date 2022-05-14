import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Moment "./utils/moment";

import Types "../triip_models/Types";
import State "../triip_models/State";

module LuckyWheel {
  public func remainingSpinTimes(uid : Text, state : State.State, max_spin_times : Int) : Int {
    var results : [Types.SpinResult] = [];
    var extra_times = 0;
    let beginning_of_day = Moment.beginningOfDay();
    for ((id, result) in state.spinresults.entries()) {
      if (result.uid == uid and Int.greaterOrEqual(result.created_at, beginning_of_day)) {
        results := Array.append<Types.SpinResult>(results, [result]);
        if (result.prize_type == "ExtraSpin") {
          extra_times += 1;
        };
      };
    };
    max_spin_times + extra_times - results.size();
  };

  public func activatedWheel(state : State.State) : ?Types.LuckyWheel {
    for((id, wheel) in state.wheels.entries()) {
      if(wheel.activate == true){
        return state.wheels.get(id);
      };
    };
    null;
  };

  public func defaultWastedPrize(state : State.State) : ?Types.Prize {
    for((id, prize) in state.prizes.entries()) {
      if(prize.prize_type == "Wasted") {
        return state.prizes.get(id);
      };
    };
    null;
  };

  public func availablePrizes(uid : Text, list : [Types.LuckyWheelPrize], state : State.State, wheel_id: ?Text) : [Types.LuckyWheelPrize] {
    var results : [Types.LuckyWheelPrize] = [];
    var today_results = todayResults(state, wheel_id);
    var user_month_results = userMonthResults(uid, state, wheel_id);
    var month_results = monthResults(state, wheel_id);
    for(prize in list.vals()) {
      let cap_per_day : Int = Option.get(today_results.get(prize.prize_id), 0);
      let cap_per_month : Int = Option.get(month_results.get(prize.prize_id), 0);
      let cap_per_user_per_month : Int = Option.get(user_month_results.get(prize.prize_id), 0);
      Debug.print(debug_show(cap_per_day, cap_per_month, cap_per_user_per_month));
      if(prize.cap_per_day > cap_per_day and prize.cap_per_month > cap_per_month and prize.cap_per_user_per_month > cap_per_user_per_month) {
        results := Array.append<Types.LuckyWheelPrize>(results, [prize]);
      };
    };
    results;
  };

  private func todayResults(state : State.State, wheel_id : ?Text) : HashMap.HashMap<Text, Int> {
    var results = HashMap.HashMap<Text, Int>(1, Text.equal, Text.hash);
    let beginning_of_day = Moment.beginningOfDay();
    for ((id, result) in state.spinresults.entries()) {
      if (result.lucky_wheel_id == wheel_id and Int.greaterOrEqual(result.created_at, beginning_of_day)) {
        let prize_id : Text = Option.get(result.prize_id, "");
        var counter : Int = 0;
        switch(results.get(prize_id)) {
          case null {
            counter += 1;
          };
          case (?v) {
            counter += v;
          };
        };
        results.put(prize_id, counter);
      };
    };
    results;
  };

  private func userMonthResults(uid : Text, state : State.State, wheel_id : ?Text) : HashMap.HashMap<Text, Int> {
    var results = HashMap.HashMap<Text, Int>(1, Text.equal, Text.hash);
    let beginning_of_month = Moment.beginningOfMonth();
    for ((id, result) in state.spinresults.entries()) {
      if (result.lucky_wheel_id == wheel_id and result.uid == uid and Int.greaterOrEqual(result.created_at, beginning_of_month)) {
        let prize_id : Text = Option.get(result.prize_id, "");
        var counter : Int = 0;
        switch(results.get(prize_id)) {
          case null {
            counter += 1;
          };
          case (?v) {
            counter += v;
          };
        };
        results.put(prize_id, counter);
      };
    };
    results;
  };

  private func monthResults(state : State.State, wheel_id : ?Text) : HashMap.HashMap<Text, Int> {
    var results = HashMap.HashMap<Text, Int>(1, Text.equal, Text.hash);
    let beginning_of_month = Moment.beginningOfMonth();
    for ((id, result) in state.spinresults.entries()) {
      if (result.lucky_wheel_id == wheel_id and Int.greaterOrEqual(result.created_at, beginning_of_month)) {
        let prize_id : Text = Option.get(result.prize_id, "");
        var counter : Int = 0;
        switch(results.get(prize_id)) {
          case null {
            counter += 1;
          };
          case (?v) {
            counter += v;
          };
        };
        results.put(prize_id, counter);
      };
    };
    results;
  };
};
