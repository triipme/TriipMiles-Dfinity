// routes
import React, { useEffect } from "react";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";

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
