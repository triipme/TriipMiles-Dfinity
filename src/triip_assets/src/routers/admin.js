import React, { lazy } from "react";
import { AdminRequiredAuth, NormalRequiredAuth } from "../containers";
const Admin = lazy(() => import("../pages/Admin/index"));
const DashboardLayout = lazy(() => import("../pages/Admin/layouts/dashboard"));
const DashboardApp = lazy(() => import("../pages/Admin/pages/DashboardApp"));
const User = lazy(() => import("../pages/Admin/pages/User"));
const Kycs = lazy(() => import("../pages/Admin/pages/Kycs"));
const Blog = lazy(() => import("../pages/Admin/pages/Blog"));
const Login = lazy(() => import("../pages/Admin/pages/Login"));
const Register = lazy(() => import("../pages/Admin/pages/Register"));
const PrizeList = lazy(() => import("../pages/Admin/pages/prize/PrizeList"));
const PrizeForm = lazy(() => import("../pages/Admin/pages/prize/Form"));

export const admin = [
  {
    path: "triip-admin",
    element: (
      <NormalRequiredAuth>
        <Admin />
      </NormalRequiredAuth>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "app",
            element: (
              <AdminRequiredAuth>
                <DashboardApp />
              </AdminRequiredAuth>
            )
          },

          {
            path: "user",
            element: (
              <AdminRequiredAuth>
                <User />
              </AdminRequiredAuth>
            )
          },

          {
            path: "blog",
            element: (
              <AdminRequiredAuth>
                <Blog />
              </AdminRequiredAuth>
            )
          },

          {
            path: "kyc",
            element: (
              <AdminRequiredAuth>
                <Kycs />
              </AdminRequiredAuth>
            )
          },

          {
            path: "login",
            element: (
              <AdminRequiredAuth>
                <Login />
              </AdminRequiredAuth>
            )
          },

          {
            path: "register",
            element: <Register />
          },

          {
            path: "prizes",
            element: (
              <AdminRequiredAuth>
                <PrizeList />
              </AdminRequiredAuth>
            )
          },
          {
            path: "prizes/new",
            element: (
              <AdminRequiredAuth>
                <PrizeForm />
              </AdminRequiredAuth>
            )
          }
        ]
      }
    ]
  }
];
