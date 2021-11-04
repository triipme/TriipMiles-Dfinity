module TravelPlan {
  public type TravelPlanInformation = {
      destination: ?Text;
      join_type: ?Nat;
      activities: ?[Bool];
      timeStart:?Int;//timestamp to start travel, but time>current time
      timeEnd:?Int;//timestamp to start travel, but time>current time
      days:?Nat;
      public_mode: ?Bool;
      img: ?Text;
      created_at:?Int;
  };
}