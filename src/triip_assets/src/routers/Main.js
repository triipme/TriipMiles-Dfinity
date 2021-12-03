import React, { createContext, useState } from "react";
import loadable from "@loadable/component";
import { BrowserRouter, Route, Routes, Navigate, Redirect } from "react-router-dom";
import { NavBar } from "../containers/index";

import { navbar, account } from "../utils/paths";

const ActorContext = createContext();

const Admin = loadable(() => import("../pages/Admin/index"));
const DashboardLayout = loadable(() => import("../pages/Admin/layouts/dashboard"));
const DashboardApp = loadable(() => import("../pages/Admin/pages/DashboardApp"));
const User = loadable(() => import("../pages/Admin/pages/User"));
const Products = loadable(() => import("../pages/Admin/pages/Products"));
const Blog = loadable(() => import("../pages/Admin/pages/Blog"));
const NotFound = loadable(() => import("../pages/Admin/pages/Page404"));

const Main = () => {
  return (
    <BrowserRouter>
      <NavBar />
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
    </BrowserRouter>
  );
};

export { Main, ActorContext };
