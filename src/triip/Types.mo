import User "model/User";
import TravelPlan "model/TravelPlan";
import ProofTP "model/ProofTP";
import Principal "mo:base/Principal";

module Types{
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
    };

    public type TravelPlanUpdate = {
        travel_plan: TravelPlan.TravelPlanInformation;
        idtp:Text;
    };

    /* ------------------------- Error --------------------------- */
    public type ProofTP = {
        proof: ProofTP.ProofTP;
        uid: Principal;
        status: Bool;
    };
    /* ------------------------- Error --------------------------- */
    public type Error = {
        #NotFound;
        #AlreadyExisting;
        #NotAuthorized;
        #SomethingWrong;
        #Failed;
    };
}