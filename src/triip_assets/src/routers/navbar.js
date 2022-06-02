import React, { lazy } from "react";
import Play from "@/pages/Game/containers/Play.mc";
import MCLevels from "@/pages/Game/games/MemoryCard/magic_memory.levels";
import { NormalRequiredAuth } from "@/containers";
// import { ExperiencePage, HomePage, SharePage, ShopPage, StayPage, GamePage } from "../pages";
const HomePage = lazy(() => import("../pages/Home"));
const ExperiencePage = lazy(() => import("../pages/Experience"));
const SharePage = lazy(() => import("../pages/Share"));
const ShopPage = lazy(() => import("../pages/Shop"));
const StayPage = lazy(() => import("../pages/Stay"));
const GamePage = lazy(() => import("../pages/Game"));
const GameLayout = lazy(() => import("../pages/Game/layout"));
const MagicMemory = lazy(() => import("../pages/Game/games/MemoryCard/magic_memory"));
const MagicMemoryEngine = lazy(() =>
  import("@/pages/Game/games/MemoryCardEngine/magic_memory_engine")
);
const MagicMemoryEngineLayout = lazy(() =>
  import("@/pages/Game/games/MemoryCardEngine/magic_memory_engine.layout")
);
const MCEngineTop = lazy(() =>
  import("@/pages/Game/games/MemoryCardEngine/magic_memory_engine.top")
);
const LucKyWheel = lazy(() => import("../pages/Game/games/lucky_wheel"));
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
    element: (
      <NormalRequiredAuth>
        <GameLayout />
      </NormalRequiredAuth>
    ),
    name: "Game",
    children: [
      { index: true, element: <GamePage /> },
      {
        path: "magic_memory",
        element: <MagicMemory />,
        children: [
          { index: true, element: <MCLevels /> },
          { path: "play", element: <Play /> }
        ]
      },
      {
        path: "magic_memory_engine",
        element: <MagicMemoryEngineLayout />,
        children: [
          { index: true, element: <MCEngineTop /> },
          { path: "play", element: <MagicMemoryEngine /> }
        ]
      },
      { path: "lucky_wheel", element: <LucKyWheel /> }
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
