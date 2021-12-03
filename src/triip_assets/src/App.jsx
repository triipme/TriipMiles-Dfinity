import React, { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { Main } from "./routers/index";
import ThemeConfig from "./theme/Theme";
import { HelmetProvider } from "react-helmet-async";
import { destinationService } from "./services";
import { useDispatch } from "react-redux";
import { destinationReducer } from "./slice/static/staticSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const des = await destinationService();
        dispatch(destinationReducer(des?.data?.map(ides => ({ ...ides, label: ides.name }))));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
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
