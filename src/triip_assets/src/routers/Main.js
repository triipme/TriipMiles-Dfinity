import { Box } from "@mui/system";
import React, { createContext, lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, Redirect } from "react-router-dom";
import { Loading } from "../components";
import { NavBar } from "../containers/index";

import { navbar, account } from "../utils/paths";

const ActorContext = createContext();

const Admin = lazy(() => import("../pages/Admin/index"));
const DashboardLayout = lazy(() => import("../pages/Admin/layouts/dashboard"));
const DashboardApp = lazy(() => import("../pages/Admin/pages/DashboardApp"));
const User = lazy(() => import("../pages/Admin/pages/User"));
const Products = lazy(() => import("../pages/Admin/pages/Products"));
const Blog = lazy(() => import("../pages/Admin/pages/Blog"));
const NotFound = lazy(() => import("../pages/Admin/pages/Page404"));

const Main = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<Loading />}>
        <Routes>
          {navbar.map((item, _) => (
            <Route key={item.path} path={item.path} exact={item?.exact} element={item.component} />
          ))}
          <Route path="/404" element={<NotFound />} />
          {/* <Route path="*" element={<Navigate to="/404" />} /> */}
          <Route key={account[0].path} path={account[0].path} element={account[0].component}>
            {account[1].nested.map(item => (
              <Route key={item.path} path={item.path} element={item.component} exact={item.exact}>
                {item?.children?.map(child => (
                  <Route key={child?.path} path={child?.path} element={child?.component} />
                ))}
              </Route>
            ))}
          </Route>
          <Route path="/triip-admin" element={<Admin />}>
            <Route path="/triip-admin/dashboard" element={<DashboardLayout />}>
              <Route path="/triip-admin/dashboard/app" element={<DashboardApp />} />
              <Route path="/triip-admin/dashboard/user" element={<User />} />
              <Route path="/triip-admin/dashboard/products" element={<Products />} />
              <Route path="/triip-admin/dashboard/blog" element={<Blog />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export { Main, ActorContext };
