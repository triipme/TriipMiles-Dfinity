import React from "react";
import PropTypes from "prop-types";

import { MenuContainer } from "./container";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Account = props => {
  return (
    <AccountContainer maxWidth="xl">
      <MenuContainer />
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
