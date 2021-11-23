// routes
import React from "react";
import Routers from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import { Outlet } from "react-router-dom";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      {/* <Outlet /> */}
      {/* <Routers /> */}
    </>
  );
}
