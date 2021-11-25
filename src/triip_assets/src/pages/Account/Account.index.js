import React from "react";
import PropTypes from "prop-types";

import { MenuContainer } from "./container";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Outlet } from "react-router-dom";

const Account = props => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <AccountContainer maxWidth="xl">
      {isSM && <MenuContainer />}
      <div style={{ padding: "40px 0", width: "100%" }}>
        <Outlet />
      </div>
    </AccountContainer>
  );
};

Account.propTypes = {};

export default Account;

const AccountContainer = styled(Container)`
  display: flex;
`;
