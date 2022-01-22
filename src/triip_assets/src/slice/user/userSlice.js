import { createSlice } from "@reduxjs/toolkit";
import { storageAPI, tranvelPlansAPI } from "./thunk";
const initialState = {
  isLogin: false,
  actor: {},
  actor_transfer: {},
  profile: {},
  tranvelplans: {},
  storage: {}
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
    actorMain: (state, action) => {
      return {
        ...state,
        actor: action.payload
      };
    },
    actorTransfer: (state, action) => {
      return {
        ...state,
        actor_transfer: action.payload
      };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(tranvelPlansAPI.fulfilled, (state, action) => {
        return {
          ...state,
          tranvelplans: action.payload
        };
      })
      .addCase(storageAPI.fulfilled, (state, action) => {
        return {
          ...state,
          storage: action.payload
        };
      });
  }
});

export const { login, actorMain, profile, actorTransfer } = userSlice.actions;
export default userSlice.reducer;
