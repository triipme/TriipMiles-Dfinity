import React from "react";
// scroll bar
// import "simplebar/src/simplebar.css";

import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";

//
import App from "./App";
const index = () => {
  return (
    <>
      <App />
      <Outlet />
    </>
  );
};

export default index;
