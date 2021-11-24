import React from "react";
import { CssBaseline } from "@mui/material";
import { Main } from "./routers/index";
import ThemeConfig from "./theme/Theme";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <HelmetProvider>
      <ThemeConfig>
        <CssBaseline />
        <Main />
      </ThemeConfig>
    </HelmetProvider>
  );
};

export default App;
