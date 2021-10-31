import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import staticReducer from "./slice/static/staticSlice";
import userReducer from "./slice/user/userSlice";

const store = configureStore({
  reducer: {
    static: staticReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<Index />, document.getElementById("app"));
