import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../components/Page";
import moment from "moment";
import { ButtonPrimary, InputText } from "@/components";
import { useForm } from "react-hook-form";
import { ERRORS } from "@/utils/constants";
import { Outlet } from "react-router-dom";

const GameLayout = () => {
  return (
    <Page title="Game | Triip Admin">
      <Outlet />
    </Page>
  );
};

export default GameLayout;
