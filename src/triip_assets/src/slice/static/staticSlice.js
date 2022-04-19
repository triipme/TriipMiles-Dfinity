import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { staticApi } from "../../api";

export const countryThunk = createAsyncThunk("static/countryApi", async (params, thunkApi) => {
  const country = await staticApi.country();
  return country.data.data;
});
export const citizenshipsThunk = createAsyncThunk(
  "static/citizenshipsApi",
  async (params, thunkApi) => {
    const citizenships = await staticApi.citizenships();
    return citizenships.data.data;
  }
);
export const kycRejectReasonThunk = createAsyncThunk(
  "static/rejectresonsApi",
  async (params, thunkApi) => {
    const rr = await staticApi.kyc.reject_reasons();
    return rr.data.data;
  }
);

const initialState = {
  travelplan: {
    activities: [
      "Beach & Sun",
      " Spa - Relax",
      " Adventure",
      " Art & Culture",
      " Food & Beverage",
      " Family & Friend",
      " Backpacker",
      " Budget",
      " Business",
      " Green",
      " History",
      " LGBT",
      " Luxury",
      " Nightlife",
      " Romantic",
      " Spiritual",
      " Student",
      " Trendsetter",
      " Vegetarian",
      " Photography",
      " Startup",
      " GTEC",
      " MTEC"
    ],
    join_type: ["Solo", "Couple", "Family", "Group"],
    destination: []
  },
  country: [],
  citizenships: [],
  kyc: {
    reject_reasons: []
  }
};

const staticSlice = createSlice({
  name: "static",
  initialState,
  reducers: {
    destinationReducer: (state, action) => {
      return {
        ...state,
        travelplan: {
          ...state.travelplan,
          destination: action.payload
        }
      };
    }
  },
  extraReducers: {
    [countryThunk.fulfilled]: (state, action) => {
      return { ...state, country: action.payload };
    },
    [countryThunk.rejected]: (state, action) => {
      return { ...state, country: [] };
    },
    [citizenshipsThunk.fulfilled]: (state, action) => {
      return { ...state, citizenships: action.payload };
    },
    [citizenshipsThunk.rejected]: (state, action) => {
      return { ...state, citizenships: [] };
    },
    [kycRejectReasonThunk.fulfilled]: (state, action) => {
      return {
        ...state,
        kyc: {
          ...state.kyc,
          reject_reasons: action.payload
        }
      };
    },
    [kycRejectReasonThunk.rejected]: (state, action) => {
      return {
        ...state,
        kyc: {
          ...state.kyc,
          reject_reasons: []
        }
      };
    }
  }
});

export const { destinationReducer } = staticSlice.actions;
const { reducer: staticReducer } = staticSlice;
export default staticReducer;
