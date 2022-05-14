import React, { lazy } from "react";
// import { ExperiencePage, HomePage, SharePage, ShopPage, StayPage, GamePage } from "../pages";
const HomePage = lazy(() => import("../pages/Home"));
const ExperiencePage = lazy(() => import("../pages/Experience"));
const SharePage = lazy(() => import("../pages/Share"));
const ShopPage = lazy(() => import("../pages/Shop"));
const StayPage = lazy(() => import("../pages/Stay"));
const GamePage = lazy(() => import("../pages/Game"));
const GameLayout = lazy(() => import("../pages/Game/layout"));
const MagicMemory = lazy(() => import("../pages/Game/games/magic_memory"));
const LuckyWheel = lazy(() => import("../pages/Game/games/lucky_wheel"));
const ARPage = lazy(() => import("../pages/AR"));
const Geolocation = lazy(() => import("../pages/AR/Geolocation"));
const Marker = lazy(() => import("../pages/AR/Marker"));
const MarkerEmbed = lazy(() => import("../pages/AR/embed/Marker"));
const GeoLocationEmbed = lazy(() => import("../pages/AR/embed/GeoLocation"));
const Metaverse = lazy(() => import("../pages/Metaverse"));

export const navbar = [
  {
    index: true,
    element: <HomePage />,
    name: "Home"
  },
  {
    path: "stay",
    element: <StayPage />,
    name: "Stay"
  },
  {
    path: "experience",
    element: <ExperiencePage />,
    name: "Experience"
  },
  {
    path: "share",
    element: <SharePage />,
    name: "Share"
  },
  {
    path: "shop",
    element: <ShopPage />,
    name: "Shop"
  },
  {
    path: "game",
    element: <GameLayout />,
    name: "Game",
    children: [
      { index: true, element: <GamePage /> },
      { path: "magic_memory", element: <MagicMemory /> },
      { path: "lucky_wheel", element: <LuckyWheel /> }
    ]
  },
  {
    path: "ar",
    element: <ARPage />,
    name: "AR",
    children: [
      {
        path: "geolocation",
        element: <Geolocation />,
        name: "AR"
      },
      {
        path: "marker",
        element: <Marker />,
        name: "AR"
      },
      {
        path: "embed/marker",
        element: <MarkerEmbed />,
        name: "AR"
      },
      {
        path: "embed/geolocation",
        element: <GeoLocationEmbed />,
        name: "AR"
      }
    ]
  },
  {
    path: "metaverse",
    element: <Metaverse />,
    name: "Metaverse"
  }
];
