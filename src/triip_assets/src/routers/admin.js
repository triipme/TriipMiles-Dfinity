import GameLayout from "@/pages/Admin/pages/Game";
import React, { lazy } from "react";
import { AdminRequiredAuth, NormalRequiredAuth } from "../containers";
const Admin = lazy(() => import("../pages/Admin/index"));
const DashboardLayout = lazy(() => import("../pages/Admin/layouts/dashboard"));
const DashboardApp = lazy(() => import("../pages/Admin/pages/DashboardApp"));
const User = lazy(() => import("../pages/Admin/pages/User"));
const Kycs = lazy(() => import("../pages/Admin/pages/Kycs"));
const Login = lazy(() => import("../pages/Admin/pages/Login"));
const Register = lazy(() => import("../pages/Admin/pages/Register"));
const PrizeList = lazy(() => import("../pages/Admin/pages/prize/PrizeList"));
const PrizeForm = lazy(() => import("../pages/Admin/pages/prize/Form"));
const EditPrize = lazy(() => import("../pages/Admin/pages/prize/EditPrize"));
const WheelList = lazy(() => import("../pages/Admin/pages/wheel/WheelList"));
const WheelForm = lazy(() => import("../pages/Admin/pages/wheel/Form"));
const EditWheel = lazy(() => import("../pages/Admin/pages/wheel/EditWheel"));
const SpinResultList = lazy(() => import("../pages/Admin/pages/spinResult/SpinResultList"));
const Transactions = lazy(() => import("../pages/Admin/pages/transactions/List"));

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
            path: "kyc",
            element: (
              <AdminRequiredAuth>
                <Kycs />
              </AdminRequiredAuth>
            )
          },
          {
            path: "game",
            element: (
              <AdminRequiredAuth>
                <GameLayout />
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
          },
          {
            path: "prizes/edit/:prize_id",
            element: (
              <AdminRequiredAuth>
                <EditPrize />
              </AdminRequiredAuth>
            )
          },
          {
            path: "wheels",
            element: (
              <AdminRequiredAuth>
                <WheelList />
              </AdminRequiredAuth>
            )
          },
          {
            path: "wheels/new",
            element: (
              <AdminRequiredAuth>
                <WheelForm />
              </AdminRequiredAuth>
            )
          },
          {
            path: "wheels/edit/:wheel_id",
            element: (
              <AdminRequiredAuth>
                <EditWheel />
              </AdminRequiredAuth>
            )
          },
          {
            path: "spinresults",
            element: (
              <AdminRequiredAuth>
                <SpinResultList />
              </AdminRequiredAuth>
            )
          },
          {
            path: "transactions",
            element: (
              <AdminRequiredAuth>
                <Transactions />
              </AdminRequiredAuth>
            )
          }
        ]
      },
    ]
  }
];
