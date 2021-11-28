import User "model/User";
import TravelPlan "model/TravelPlan";
import Principal "mo:base/Principal";

module Types{
    /* ------------------------- User --------------------------- */
    public type Profile = {
        user : User.User;
    };

    /* ------------------------- TravelPlan --------------------------- */
    public type TravelPlan = {
        travel_plan: TravelPlan.TravelPlanInformation;
        uid:Principal;
        idtp:Text;
    };

    public type TravelPlanUpdate = {
        travel_plan: TravelPlan.TravelPlanInformation;
        idtp:Text;
    };

    /* ------------------------- Error --------------------------- */
    public type Error = {
        #NotFound;
        #AlreadyExisting;
        #NotAuthorized;
        #SomethingWrong;
    };
}