import React from "react";
// scroll bar
// import "simplebar/src/simplebar.css";

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";

//
import App from "./App";
const index = () => {
  console.log("admin");
  return (
    <>
      <HelmetProvider>
        <App />
        <Outlet />
      </HelmetProvider>
    </>
  );
};

export default index;
