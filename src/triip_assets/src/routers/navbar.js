import { ExperiencePage, HomePage, SharePage, ShopPage, StayPage } from "../pages/index";

export const navbar = [
  {
    path: "/",
    component: HomePage,
    name: "Home",
    exact: true
  },
  {
    path: "/stay",
    component: StayPage,
    name: "Stay"
  },
  {
    path: "/experience",
    component: ExperiencePage,
    name: "Experience"
  },
  {
    path: "/share",
    component: SharePage,
    name: "Share"
  },
  {
    path: "/shop",
    component: ShopPage,
    name: "Shop"
  }
];
