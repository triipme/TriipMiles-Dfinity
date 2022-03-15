import React, { lazy } from "react";
import { AccountPage } from "../../pages";
import { TravelPlanContainer } from "../../pages/Account/container";
import {
  // AccountFeature,
  BookingFeature,
  // KYCFeature,
  NotificationFeature,
  SalesFeature
  // TravelPlansFeature
} from "../../pages/Account/features";
import Verify from "../../pages/Account/features/KYC/verify";
const KYCFeature = lazy(() => import("../../pages/Account/features/KYC"));
const AccountFeature = lazy(() => import("../../pages/Account/features/Account"));
const TravelPlansFeature = lazy(() => import("../../pages/Account/features/TravelPlans"));
export const account = [
  {
    path: "account",
    name: "Account",
    component: <AccountPage />
  },
  {
    nested: [
      {
        path: "/account/me",
        name: "Wallet",
        component: <AccountFeature />,
        exact: false
      },
      {
        path: "/account/travelplans",
        name: "Travel Plans",
        component: <TravelPlansFeature />
        // children: [
        //   {
        //     path: ":idtp",
        //     name: "Travel Plans Detaild",
        //     component: <TravelPlanContainer />
        //   }
        // ]
      },
      {
        path: "/account/kyc",
        name: "Verify Account (KYC)",
        component: <KYCFeature />,
        children: [{ path: "/account/kyc/verify", name: "verify", component: <Verify /> }]
      }
      // {
      //   path: "/account/notifications",
      //   name: "Notifications",
      //   component: <NotificationFeature />
      // },
      // {
      //   path: "/account/bookings",
      //   name: "Bookings",
      //   component: <BookingFeature />
      // },
      // {
      //   path: "/account/sales",
      //   name: "Sales",
      //   component: <SalesFeature />
      // }
    ]
  }
];
