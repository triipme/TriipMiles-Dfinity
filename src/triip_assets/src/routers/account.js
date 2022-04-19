import { NormalRequiredAuth } from "@/containers";
import React, { lazy } from "react";
import { AccountPage } from "../pages";
import Verify from "../pages/Account/features/KYC/verify";
const KYCFeature = lazy(() => import("../pages/Account/features/KYC"));
const AccountFeature = lazy(() => import("../pages/Account/features/Account"));
const TravelPlansFeature = lazy(() => import("../pages/Account/features/TravelPlans"));
export const account = [
  {
    path: "account",
    name: "Account",
    element: (
      <NormalRequiredAuth>
        <AccountPage />
      </NormalRequiredAuth>
    ),

    children: [
      {
        redirect: "/account/me",
        path: "me",
        name: "Wallet",
        element: <AccountFeature />,
        exact: false
      },
      {
        redirect: "/account/travelplans",
        path: "travelplans",
        name: "Travel Plans",
        element: <TravelPlansFeature />
        // children: [
        //   {
        //     redirect: ":idtp",
        //     path: ":idtp",
        //     name: "Travel Plans Detaild",
        //     element: <TravelPlanContainer />
        //   }
        // ]
      },
      {
        redirect: "/account/kyc",
        path: "kyc",
        name: "Verify Account (KYC)",
        element: <KYCFeature />,
        children: [
          {
            redirect: "/account/kyc/verify",
            path: "verify",
            name: "verify",
            element: <Verify />
            // children: [
            //   {
            //     redirect: "/account/kyc/verify/1",
            //     path: "1",
            //     element: <FormKYC.S1 />
            //   },
            //   {
            //     redirect: "/account/kyc/verify/2",
            //     path: "2",
            //     element: <FormKYC.S2 />
            //   },
            //   {
            //     redirect: "/account/kyc/verify/3",
            //     path: "3",
            //     element: <FormKYC.S3 />
            //   }
            // ]
          }
        ]
      }
      // {
      //   redirect: "/account/notifications",
      //   path: "notifications",
      //   name: "Notifications",
      //   element: <NotificationFeature />
      // },
      // {
      //   redirect: "/account/bookings",
      //   path: "bookings",
      //   name: "Bookings",
      //   element: <BookingFeature />
      // },
      // {
      //   redirect: "/account/sales",
      //   path: "sales",
      //   name: "Sales",
      //   element: <SalesFeature />
      // }
    ]
  }
];
