import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import staticReducer from "./slice/static/staticSlice";
import userReducer from "./slice/user/userSlice";
import adminReducer from "./slice/admin/adminSlice";

const store = configureStore({
  reducer: {
    static: staticReducer,
    user: userReducer,
    admin: adminReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<Index />, document.getElementById("app"));

export default store;
