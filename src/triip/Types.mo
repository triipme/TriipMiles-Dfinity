import User "model/User";
import Admin "model/Admin";
import TravelPlan "model/TravelPlan";
import ProofTP "model/ProofTP";
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

    /* ------------------------- Error --------------------------- */
    public type ProofTP = {
        proof: ProofTP.ProofTP;
        uid: Principal;
        status: Text;
        created_at: Int;
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