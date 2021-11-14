import React from "react";
import PropTypes from "prop-types";

import { MenuContainer } from "./container";
import styled from "@emotion/styled";
import { AccountRouter } from "../../routers";
import { useRouteMatch } from "react-router-dom";
import { Container } from "@mui/material";

const Account = props => {
  return (
    <AccountContainer maxWidth="xl">
      <MenuContainer />
      <AccountRouter />
    </AccountContainer>
  );
};

Account.propTypes = {};

export default Account;

const AccountContainer = styled(Container)`
  display: flex;
`;
