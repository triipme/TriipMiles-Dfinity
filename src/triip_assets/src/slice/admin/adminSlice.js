import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  travelplans: [],
  info: ""
};

export const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    info: (state, action) => {
      return {
        ...state,
        info: action.payload
      };
    },
    getAllTP: (state, action) => {
      return {
        ...state,
        travelplans: action.payload
      };
    }
  }
});

export const { getAllTP, info } = adminSlice.actions;
export default adminSlice.reducer;
