import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material/index";
import { useTheme } from "@mui/material/styles";

import { AuthClient } from "@dfinity/auth-client";

import { NavLinkStyled } from "../../components/NavLink/NavLink";
import { navbar } from "../../routers/navbar";
import { ContainerStyled } from "./NavBar.style";
const NavBar = ({}) => {
  const theme = useTheme();
  const authClient = useRef(null);
  const [principal, setPrincipal] = useState();

  useEffect(() => {
    (async () => {
      authClient.current = await AuthClient.create();
      setPrincipal(await authClient.current.getIdentity().getPrincipal());
    })();
  }, []);
  const handleLogin = () => {
    authClient.current.login({
      onSuccess: async () => {
        setPrincipal(await authClient.current.getIdentity().getPrincipal());
      }
    });
  };
  console.log(principal);
  return (
    <ContainerStyled maxWidth="xl">
      <div>
        {navbar.map((item, _) => (
          <NavLinkStyled
            key={item.path}
            to={item.path}
            activeStyle={
              !item?.exact && {
                color: theme.palette.secondary.main
              }
            }>
            {item.name}
          </NavLinkStyled>
        ))}
      </div>
      <div>
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
      </div>
    </ContainerStyled>
  );
};

NavBar.propTypes = {};

export default NavBar;
