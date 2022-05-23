import React from "react";
import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";

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
    icon: getIcon("clarity:map-solid")
  },
  {
    title: "KYC",
    path: "/triip-admin/dashboard/kyc",
    icon: getIcon("clarity:map-solid")
  },
  {
    title: "Prizes",
    path: "/triip-admin/dashboard/prizes",
    icon: getIcon("clarity:map-solid")
  },
  {
    title: "Game",
    path: "/triip-admin/dashboard/game",
    icon: getIcon("clarity:map-solid")
  }
];

export default sidebarConfig;
