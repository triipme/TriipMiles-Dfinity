import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat64 "mo:base/Nat64";

import User "model/User";
import Admin "model/Admin";
import TravelPlan "model/TravelPlan";
import ProofTP "model/ProofTP";
import Vetted "model/Vetted";
import KYC "model/KYC";
import MemoryCard "model/games/MemoryCard";
import Ledger "model/Ledger";

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

  /* ------------------------- Games --------------------------- */
  // MemoryCard
  public type MemoryCardLevel = MemoryCard.Level;
  public type MemoryCardPlayer = MemoryCard.Player;
  public type MemoryCardReward = MemoryCard.Reward;

  /* ------------------------- Prize --------------------------- */ // new feature
  public type Prize = {
    uuid: ?Text;
    prize_type: Text;
    name: Text;
    icon: Text;
    quantity: Float;
    description: Text;
    created_at: ?Int;
  };

  public type LuckyWheelPrize = {
    prize_id: Text;
    percentage: Float;
    cap_per_user_per_month: Int;
    cap_per_month: Int;
    cap_per_day: Int;
  };

  /* ------------------------- Lucky Wheel --------------------------- */ // new feature
  public type LuckyWheel = {
    uuid: ?Text;
    name: Text;
    max_spin_times: Int;
    max_buy_spin_times: Int;
    price_of_spin: Float;
    created_at: ?Int;
    updated_at: ?Int;
    activate: Bool;
    activated_at: Int;
    wheel_prizes: [LuckyWheelPrize];
  };

  public type LuckyWheelUpdate = {
    name: Text;
    max_spin_times: Int;
    max_buy_spin_times: Int;
    price_of_spin: Float;
    wheel_prizes: [LuckyWheelPrize];
  };

  /* ------------------------- Spin Result --------------------------- */
  public type SpinResult = {
    uid: Text;
    lucky_wheel_id: ?Text;
    prize_id: ?Text;
    prize_name: Text;
    prize_type: Text;
    prize_amount: Float;
    state: Text;
    remark: ?Text;
    created_at: Int;
    updated_at: ?Int;
  };

  public type SpinResultSerializer = {
    uuid : Text;
    prize_name : Text;
    icon : Text;
    remark : ?Text;
  };

  /* ------------------------- Transaction ---------------------- */
  public type TxRecord = {
    uuid: Text;
    caller : Principal;
    refType : Text;
    refId : Text;
    blockIndex : ?Nat64;
    toAddress : Text;
    amount : Ledger.ICP;
    fee : Ledger.ICP;
    timestamp : Time.Time;
    txError : ?Text;
  };
  /* ------------------------- Transaction ---------------------- */

  /* ------------------------- Error --------------------------- */
  public type Error = {
    #NotFound;
    #AlreadyExisting;
    #NotAuthorized;
    #AdminRoleRequired;
    #SomethingWrong;
    #Failed;
    #Enough;
    #NonKYC;
    #Unavailable;
    #NotEnoughPermission;
  };
    /* ------------------------- Error --------------------------- */
}