import React, { createContext, lazy } from "react";
import { Navigate, useRoutes } from "react-router";
const NotFound = lazy(() => import("../pages/Admin/pages/Page404"));

import { navbar, account } from ".";
import { admin } from "./admin";

const ActorContext = createContext();

const Main = () => {
  return useRoutes([
    ...navbar,
    {
      path: "404",
      element: <NotFound />
    },
    {
      path: "*",
      element: <Navigate to="404" />
    },
    ...account,
    ...admin
  ]);
};

export { Main, ActorContext };
