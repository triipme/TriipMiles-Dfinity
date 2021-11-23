import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  actor: {},
  profile: {}
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        isLogin: action.payload
      };
    },
    profile: (state, action) => {
      return {
        ...state,
        profile: action.payload
      };
    },
    actorSlice: (state, action) => {
      return {
        ...state,
        actor: action.payload
      };
    }
  }
});

export const { login, actorSlice, profile } = userSlice.actions;
export default userSlice.reducer;
