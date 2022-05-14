import Time "mo:base/Time";
import Int "mo:base/Int";
import Option "mo:base/Option";

module Moment {
   public func beginningOfDay() : Int {
      Time.now()/(864*(10**11))*(864*(10**11));
   };
   public func endOfDay() : Int {
      beginningOfDay() + (864*(10**11))
   };
   public func yesterday() : Int {
      beginningOfDay() - (864*(10**11))
   };
   public func now() : Int {
      Time.now()
   };
   public func between(current : Int) : Bool {
      Int.greater(yesterday(),current) and Int.less(current,beginningOfDay())
   };
   public func diff(day : ?Int) : Int {
      let start_of_day : Int = beginningOfDay();
      Option.get(day,Time.now()) - start_of_day;
   };
}