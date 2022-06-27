import Time "mo:base/Time";
import Int "mo:base/Int";
import Int32 "mo:base/Int32";
import Option "mo:base/Option";
import Debug "mo:base/Debug";

import Date "../plugins/chronosphere/Date"

module Moment {
  public func beginningOfMonth() : Int {
    let current_date = Date.unpack(Date.now());
    Date.dateToEpoch(current_date.year, current_date.month, #Day 1);
  };
  public func beginningOfDay() : Int {
    Time.now()/(864*(10**11))*(864*(10**11));
  };
  public func endOfDay() : Int {
    beginningOfDay() + (864*(10**11))
  };
  public func beginningOfYesterday() : Int {
    beginningOfDay() - (864*(10**11))
  };
  public func now() : Int {
    Time.now()
  };
  public func yesterday(current : Int) : Bool {
    Debug.print(debug_show(beginningOfYesterday(),current,beginningOfDay()));
    Int.less(beginningOfYesterday(),current) and Int.less(current,beginningOfDay())
  };
  public func diff(day : ?Int) : Int {
    let start_of_day : Int = beginningOfDay();
    Option.get(day,Time.now()) - start_of_day;
  };
}