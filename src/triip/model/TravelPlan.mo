module TravelPlan {
  public type TravelPlanInformation = {
      destination: ?Text;
      join_type: ?Nat;
      activities: ?[Bool];
      time:?Int;//timestamp to start travel, but time>current time
      days:?Nat;
      public_mode: ?Bool;
  };
}