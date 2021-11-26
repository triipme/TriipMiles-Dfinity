import React from "react";
import loadable from "@loadable/component";
import { Navigate, Redirect } from "react-router-dom";
import { ExperiencePage, HomePage, SharePage, ShopPage, StayPage } from "../../pages";
const NotFound = loadable(() => import("../../pages/Admin/pages/Page404"));

export const navbar = [
  {
    path: "/",
    component: <HomePage />,
    name: "Home",
    exact: true
  },
  {
    path: "/stay",
    component: <StayPage />,
    name: "Stay",
    exact: true
  },
  {
    path: "/experience",
    component: <ExperiencePage />,
    name: "Experience"
  },
  {
    path: "/share",
    component: <SharePage />,
    name: "Share"
  },
  {
    path: "/shop",
    component: <ShopPage />,
    name: "Shop"
  },
  {
    path: "/404",
    component: <NotFound />
    // name: "Shop"
  },
  {
    path: "*",
    component: <Navigate to="/404" />
    // name: "Shop"
  }
];
