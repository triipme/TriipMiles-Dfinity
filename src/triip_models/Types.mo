import User "model/User";
import Admin "model/Admin";
import TravelPlan "model/TravelPlan";
import ProofTP "model/ProofTP";
import Vetted "model/Vetted";
import KYC "model/KYC";
import Locale "model/Locale";
import PrizeDetail "model/PrizeDetail";
import WheelPrize "model/WheelPrize";
import Principal "mo:base/Principal";

module Types{
  /* ------------------------- Admin --------------------------- */
  // public type Role ={
  //     #owner;
  //     #member;
  // };
  public type Admin = {
    admin : Admin.Admin;
    // role : Role;
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
  public type KYCs = { // id của kyc theo principal (của user tham khảo ở profiles hoặc admin)
    info: KYC.Info; //info 
    images: [Text]; //mang id image để query file trong s3, max 3 vì front,back,self
    comments:Text; 
    status:Text; // 3 trang thái unknown,new,waitting,rejected,approved
    createdAt:Text; //dùng currenttime trong docs dfinity
    updatedAt:Text; //nếu đã submit nhưng bị reject thì update mà ko cần tạo kyc mới
  };

   /* ------------------------- Prize --------------------------- */ // new feature
  public type Prize = {
    id: Text;
    uid: Principal;
    // locales: [Locale.Locale];
    prize_type: Text;
    name: Text;
    icon: Text;
    quantity: Int;
    decs: Text;
    created_at: ?Int;
    // prize_detail: PrizeDetail.PrizeDetail;
  };

  public type PrizeUpdate = {
    id: Text;
    // locales: [Locale.Locale];
    // prize_detail: PrizeDetail.PrizeDetail;
    prize_type: Text;
    name: Text;
    icon: Text;
    quantity: Int;
    decs: Text;
  };

  /* ------------------------- Lucky Wheel --------------------------- */ // new feature
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