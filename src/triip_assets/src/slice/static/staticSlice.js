import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const staticSlice = createSlice({
  name: "static",
  initialState,
  reducers: {
    testAction: state => {
      state.test = "Hell World";
    }
  }
});

export const { testAction } = staticSlice.actions;
export default staticSlice.reducer;
