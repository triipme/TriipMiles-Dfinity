import { createSlice } from "@reduxjs/toolkit";
import * as API from "./thunk";
const initialState = {
  isLogin: false,
  actor: {},
  profile: {},
  tranvelplans: {},
  storage: {},
  spinResults: {},
  remainingSpinTimes: 0,
};

export const logoutUser = () => async (dispatch, _getState) => {
  return dispatch(resetUser());
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
    resetUser: (_state, _action) => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(API.tranvelPlansAPI.fulfilled, (state, action) => {
        return {
          ...state,
          tranvelplans: action.payload
        };
      })
      .addCase(API.storageAPI.fulfilled, (state, action) => {
        return {
          ...state,
          storage: action.payload
        };
      })
      .addCase(API.spinResultsAPI.fulfilled, (state, action) => {
        return {
          ...state,
          spinResults: action.payload
        };
      })
      .addCase(API.spinRemainingAPI.fulfilled, (state, action) => {
        return {
          ...state,
          remainingSpinTimes: action.payload
        };
      });
  }
});

export const { login, actorMain, profile, resetUser } = userSlice.actions;
export default userSlice.reducer;
