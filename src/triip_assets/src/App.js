import React, { Suspense, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { Main } from "./routers";
import ThemeConfig from "./theme/Theme";
import { HelmetProvider } from "react-helmet-async";
import { destinationService } from "./services";
import { useDispatch } from "react-redux";
import { destinationReducer } from "./slice/static/staticSlice";
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";
import { Loading, Notification } from "./components";
import { NavBar } from "./containers";
import { BrowserRouter } from "react-router-dom";

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
    <SimpleBarReact style={{ maxHeight: "100vh" }}>
      <HelmetProvider>
        <ThemeConfig>
          <CssBaseline />
          <Notification />
          <BrowserRouter>
            <NavBar />
            <Suspense fallback={<Loading />}>
              <Main />
            </Suspense>
          </BrowserRouter>
        </ThemeConfig>
      </HelmetProvider>
    </SimpleBarReact>
  );
};

export default App;
