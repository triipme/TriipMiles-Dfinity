import User "model/User";
import Admin "model/Admin";
import TravelPlan "model/TravelPlan";
import ProofTP "model/ProofTP";
import Vetted "model/Vetted";
import KYC "model/KYC";
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