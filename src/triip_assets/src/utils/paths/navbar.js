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
const Geolocation = lazy(() => import("../../pages/AR/Geolocation"));
const Marker = lazy(() => import("../../pages/AR/Marker"));
const MarkerEmbed = lazy(() => import("../../pages/AR/embed/Marker"));
const GeoLocationEmbed = lazy(() => import("../../pages/AR/embed/GeoLocation"));
const Metaverse = lazy(() => import("../../pages/Metaverse"));

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
    name: "AR",
    children: [
      {
        path: "/ar/geolocation",
        component: <Geolocation />,
        name: "AR"
      },
      {
        path: "/ar/marker",
        component: <Marker />,
        name: "AR"
      },
      {
        path: "/ar/embed/marker",
        component: <MarkerEmbed />,
        name: "AR"
      },
      {
        path: "/ar/embed/geolocation",
        component: <GeoLocationEmbed />,
        name: "AR"
      }
    ]
  },
  {
    path: "/metaverse",
    component: <Metaverse />,
    name: "Metaverse"
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
