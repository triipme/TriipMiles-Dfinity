import React from "react";
import { CssBaseline } from "@mui/material";
import { Main } from "./routers/index";
import ThemeConfig from "./theme/Theme";

const App = () => {
  return (
    <ThemeConfig>
      <CssBaseline />
      <Main />
    </ThemeConfig>
  );
};

export default App;
