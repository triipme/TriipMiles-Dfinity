import React, { lazy } from "react";
import { Navigate, Redirect } from "react-router-dom";
// import { ExperiencePage, HomePage, SharePage, ShopPage, StayPage, GamePage } from "../../pages";
const NotFound = lazy(() => import("../../pages/Admin/pages/Page404"));
const HomePage = lazy(() => import("../../pages/Home"));
const ExperiencePage = lazy(() => import("../../pages/Experience"));
const SharePage = lazy(() => import("../../pages/Share"));
const ShopPage = lazy(() => import("../../pages/Shop"));
const StayPage = lazy(() => import("../../pages/Stay"));
const GamePage = lazy(() => import("../../pages/Game"));
const ARPage = lazy(() => import("../../pages/AR"));

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
    path: "/game",
    component: <GamePage />,
    name: "Game"
  },
  {
    path: "/ar",
    component: <ARPage />,
    name: "AR"
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
