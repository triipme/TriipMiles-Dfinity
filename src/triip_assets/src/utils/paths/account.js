import React from "react";
import { AccountPage } from "../../pages";
import { TravelPlanContainer } from "../../pages/Account/container";
import {
  AccountFeature,
  BookingFeature,
  NotificationFeature,
  SalesFeature,
  TravelPlansFeature
} from "../../pages/Account/features";
export const account = [
  {
    path: "/account",
    name: "Account",
    component: <AccountPage />
  },
  {
    nested: [
      {
        path: "/account/me",
        name: "Account",
        component: <AccountFeature />,
        exact: false
      },
      {
        path: "/account/travelplans",
        name: "Travel Plans",
        component: <TravelPlansFeature />,
        children:[
          {
            path: "/account/travelplans/:idtp",
            name: "Travel Plans Detaild",
            component: <TravelPlanContainer />,
          }
        ]
      },
      {
        path: "/account/notifications",
        name: "Notifications",
        component: <NotificationFeature />
      },
      {
        path: "/account/bookings",
        name: "Bookings",
        component: <BookingFeature />
      },
      {
        path: "/account/sales",
        name: "Sales",
        component: <SalesFeature />
      }
    ]
  }
];
