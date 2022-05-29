import AdminLuckyWheels from "@/pages/Admin/components/admin_luckywheel/AdminLuckyWheels";
import LayoutAddPrize from "../pages/Admin/components//admin_luckywheel/prizes/handlePrizes/Layout";
import EditPrizes from "../pages/Admin/components//admin_luckywheel/prizes/handlePrizes/EditPrizes";
import LuckyWheels from "../pages/Admin/components/admin_luckywheel/luckywheel/LuckyWheels";
import DetailLuckyWheel from "../pages/Admin/components//admin_luckywheel/luckywheel/handleLuckyWheels/DetailLuckyWheel";
import EditLuckyWheel from "../pages/Admin/components//admin_luckywheel/luckywheel/handleLuckyWheels/EditLuckyWheel";
import SpinResults from "../pages/Admin/components//admin_luckywheel/spin_results/SpinResults";
import React, { lazy } from "react";
import { AdminRequiredAuth, NormalRequiredAuth } from "../containers";
import AddLuckyWheelsItem from "@/pages/Admin/components/admin_luckywheel/luckywheel/handleLuckyWheels/AddLuckyWheelsItem";
const Admin = lazy(() => import("../pages/Admin/index"));
const DashboardLayout = lazy(() => import("../pages/Admin/layouts/dashboard"));
const DashboardApp = lazy(() => import("../pages/Admin/pages/DashboardApp"));
const User = lazy(() => import("../pages/Admin/pages/User"));
const Kycs = lazy(() => import("../pages/Admin/pages/Kycs"));
const Blog = lazy(() => import("../pages/Admin/pages/Blog"));
const Login = lazy(() => import("../pages/Admin/pages/Login"));
const Register = lazy(() => import("../pages/Admin/pages/Register"));

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
            path: "admin_prizes",
            element: (
              <AdminRequiredAuth>
                <AdminLuckyWheels />
              </AdminRequiredAuth>
            )
          },
          {
            path: "admin_prizes/prizes",
            element: (
              <AdminRequiredAuth>
                <LayoutAddPrize />
              </AdminRequiredAuth>
            )
          },
          {
            path: "/triip-admin/dashboard/admin_prizes/prizes/edit",
            element: (
              <AdminRequiredAuth>
                <EditPrizes />
              </AdminRequiredAuth>
            )
          },
          {
            path: "admin_luckywheel",
            element: (
              <AdminRequiredAuth>
                <LuckyWheels />
              </AdminRequiredAuth>
            )
          },
          {
            path: "/triip-admin/dashboard/admin_luckywheel/new_wheel",
            element: (
              <AdminRequiredAuth>
                <AddLuckyWheelsItem />
              </AdminRequiredAuth>
            )
          },
          {
            path: "/triip-admin/dashboard/admin_luckywheel/2",
            element: (
              <AdminRequiredAuth>
                <DetailLuckyWheel />
              </AdminRequiredAuth>
            )
          },
          {
            path: "/triip-admin/dashboard/admin_luckywheel/edit",
            element: (
              <AdminRequiredAuth>
                <EditLuckyWheel />
              </AdminRequiredAuth>
            )
          },
          {
            path: "/triip-admin/dashboard/admin_spin-result",
            element: (
              <AdminRequiredAuth>
                <SpinResults />
              </AdminRequiredAuth>
            )
          },

          {
            path: "register",
            element: <Register />
          }
        ]
      }
    ]
  }
];
