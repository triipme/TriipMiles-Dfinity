import Principal "mo:base/Principal";

import User "model/User";
import Admin "model/Admin";
import TravelPlan "model/TravelPlan";
import ProofTP "model/ProofTP";
import Vetted "model/Vetted";
import KYC "model/KYC";

module{
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