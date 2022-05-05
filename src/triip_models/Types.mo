import Principal "mo:base/Principal";

import User "model/User";
import Admin "model/Admin";
import TravelPlan "model/TravelPlan";
import ProofTP "model/ProofTP";
import Vetted "model/Vetted";
import KYC "model/KYC";
import WheelPrize "model/WheelPrize";

module {
  public type Admin = {
    admin : Admin.Admin;
  };
  public type Vetted = Vetted.Vetted;

  /* ------------------------- User --------------------------- */
  public type Profile = {
    user : User.User;
    wallets: ?[Text];
  };

  /* ------------------------- TravelPlan --------------------------- */
  public type TravelPlan = {
    travel_plan: TravelPlan.TravelPlanInformation;
    uid:Principal;
    is_received: Bool;
    created_at: Int;
  };

  public type TravelPlanUpdate = {
    travel_plan: TravelPlan.TravelPlanInformation;
    idtp:Text;
  };

  /* ------------------------- ProofTP --------------------------- */
  public type ProofTP = {
    proof: ProofTP.ProofTP;
    uid: Principal;
    status: Text;
    created_at: Int;
  };

  /* ------------------------- KYC --------------------------- */
  public type KYCs = {
    info: KYC.Info;
    images: [Text]; //keys of front,back,self photo
    comments:?Text; //Reason reject
    status:?Text; // new,waitting,rejected,approved
    approver:?Principal;
    createdAt:?Int;
    updatedAt:?Int;
  };
  public type KYCsUpdate = {
    info: KYC.Info;
    images: [Text];
    comments:?Text;
  };

  /* ------------------------- Prize --------------------------- */
  public type Prize = {
    id: Text;
    uid: Principal;
    prize_type: Text;
    name: Text;
    icon: Text;
    quantity: Int;
    decs: Text;
    created_at: ?Int;
  };

  public type PrizeUpdate = {
    id: Text;
    prize_type: Text;
    name: Text;
    icon: Text;
    quantity: Int;
    decs: Text;
  };

  /* ------------------------- Lucky Wheel --------------------------- */
  public type LuckyWheel = {
    uid: Principal;
    id: Text;
    name: Text;
    max_spin_times: Int;
    max_buy_spin_times: Int;
    price_of_spin: Float;
    created_at: Int;
    updated_at: Int;
    wheel_prizes: [WheelPrize.WheelPrize];
    activate: Bool;
    activated_at: Int;
  };

  public type LuckyWheelUpdate = {
    id: Text;
    name: Text;
    max_spin_times: Int;
    max_buy_spin_times: Int;
    price_of_spin: Float;
    wheel_prizes: [WheelPrize.WheelPrize];
  };

  /* ------------------------- Error --------------------------- */
  public type Error = {
    #NotFound;
    #AlreadyExisting;
    #NotAuthorized;
    #SomethingWrong;
    #Failed;
    #Enough;
  };
}