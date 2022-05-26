import React from "react";
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";

// ----------------------------------------------------------------------

const getIcon = name => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/triip-admin/dashboard/app",
    icon: getIcon(pieChart2Fill)
  },
  {
    title: "travel plan",
    path: "/triip-admin/dashboard/user",
    icon: getIcon("material-symbols:googler-travel")
  },
  {
    title: "KYC",
    path: "/triip-admin/dashboard/kyc",
    icon: getIcon("fa6-solid:users-rectangle")
  },
  {
    title: "Prizes",
    path: "/triip-admin/dashboard/prizes",
    icon: getIcon("noto:wheel")
  },
  {
    title: "Memory Game",
    path: "/triip-admin/dashboard/game",
    icon: getIcon("arcticons:memo-game")
  }
];

export default sidebarConfig;
