import axios from "axios";
export const staticApi = {
  country: () => axios.get("https://www.triip.me/api/v1/countries"),
  citizenships: () => axios.get("https://www.triip.me/api/v1/citizenships"),
  kyc: {
    reject_reasons: () => axios.get("https://www.triip.me/api/v1/kyc_reject_reasons")
  }
};
