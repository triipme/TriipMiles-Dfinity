import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import staticReducer from "./slice/static/staticSlice";
import App from "./App";

const store = configureStore({
  reducer: {
    static: staticReducer
  },
  devTools: true
});

const Index = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<Index />, document.getElementById("app"));
