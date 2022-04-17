import React, { lazy } from "react";
import { AdminRequiredAuth, NormalRequiredAuth } from "../containers";
const Admin = lazy(() => import("../pages/Admin/index"));
const DashboardLayout = lazy(() => import("../pages/Admin/layouts/dashboard"));
const DashboardApp = lazy(() => import("../pages/Admin/pages/DashboardApp"));
const User = lazy(() => import("../pages/Admin/pages/User"));
const Kycs = lazy(() => import("../pages/Admin/pages/Kycs"));
const Blog = lazy(() => import("../pages/Admin/pages/Blog"));
const Login = lazy(() => import("../pages/Admin/pages/Login"));

export const account = [
  {
    path: "triip-admin",
    element: (
      <NormalRequiredAuth>
        <AdminRequiredAuth>
          <Admin />
        </AdminRequiredAuth>
      </NormalRequiredAuth>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "app",
            element: <DashboardApp />
          },

          {
            path: "user",
            element: <User />
          },

          {
            path: "blog",
            element: <Blog />
          },

          {
            path: "kyc",
            element: <Kycs />
          },

          {
            path: "login",
            element: <Login />
          }
        ]
      }
    ]
  }
];
