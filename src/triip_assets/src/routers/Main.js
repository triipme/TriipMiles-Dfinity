import { Box } from "@mui/system";
import React, { createContext, lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Loading, Notification } from "../components";
import { AdminRequiredAuth, NavBar, NormalRequiredAuth } from "../containers";
import Kyc from "../pages/Admin/pages/Kycs";

import { navbar, account } from "../utils/paths";

const ActorContext = createContext();

const Admin = lazy(() => import("../pages/Admin/index"));
const DashboardLayout = lazy(() => import("../pages/Admin/layouts/dashboard"));
const DashboardApp = lazy(() => import("../pages/Admin/pages/DashboardApp"));
const User = lazy(() => import("../pages/Admin/pages/User"));
const Kycs = lazy(() => import("../pages/Admin/pages/Kycs"));
const Blog = lazy(() => import("../pages/Admin/pages/Blog"));
const Login = lazy(() => import("../pages/Admin/pages/Login"));
const Register = lazy(() => import("../pages/Admin/pages/Register"));
const NotFound = lazy(() => import("../pages/Admin/pages/Page404"));

const Main = () => {
  return (
    <BrowserRouter>
      <Notification />
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Routes>
          {navbar.map((item, _) => (
            <Route key={item.path} path={item.path} exact={item?.exact} element={item.component}>
              {item?.children?.map(child => (
                <Route key={child?.path} path={child?.path} element={child?.component} />
              ))}
            </Route>
          ))}
          <Route path="404" element={<NotFound />} />
          {/* <Route path="*" element={<Navigate to="/404" />} /> */}
          <Route key={account[0].path} path={account[0].path} element={account[0].component}>
            {account[1].nested.map(item => (
              <Route
                key={item.path}
                path={item.path}
                element={<NormalRequiredAuth>{item.component}</NormalRequiredAuth>}
                exact={item.exact}>
                {item?.children?.map(child => (
                  <Route key={child?.path} path={child?.path} element={child?.component} />
                ))}
              </Route>
            ))}
          </Route>
          <Route
            path="triip-admin"
            element={
              <NormalRequiredAuth>
                <Admin />
              </NormalRequiredAuth>
            }>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route
                path="app"
                element={
                  <AdminRequiredAuth>
                    <DashboardApp />
                  </AdminRequiredAuth>
                }
              />
              <Route
                path="user"
                element={
                  <AdminRequiredAuth>
                    <User />
                  </AdminRequiredAuth>
                }
              />
              <Route
                path="blog"
                element={
                  <AdminRequiredAuth>
                    <Blog />
                  </AdminRequiredAuth>
                }
              />
              <Route
                path="kyc"
                element={
                  <AdminRequiredAuth>
                    <Kycs />
                  </AdminRequiredAuth>
                }
              />
              <Route
                path="login"
                element={
                  <AdminRequiredAuth>
                    <Login />
                  </AdminRequiredAuth>
                }
              />
              <Route path="register" element={<Register />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export { Main, ActorContext };
