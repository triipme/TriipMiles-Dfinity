import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  travelplans: []
};

export const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllTP: (state, action) => {
      return {
        ...state,
        travelplans: action.payload
      };
    }
  }
});

export const { getAllTP } = adminSlice.actions;
export default adminSlice.reducer;
