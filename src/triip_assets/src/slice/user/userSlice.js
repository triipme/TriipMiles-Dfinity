import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload;
    }
  }
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
