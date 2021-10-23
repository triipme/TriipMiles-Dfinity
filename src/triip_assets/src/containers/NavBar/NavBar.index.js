import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@mui/material/index";
import { useTheme } from "@mui/material/styles";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";

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
      setPrincipal(await authClient.current.getIdentity());
    })();
  }, []);
  const handleLogin = () => {
    authClient.current.login({
      indentityProvider: "https://identity.messaging.ic0.app/#authorize",
      onSuccess: async () => {
        setPrincipal(await authClient.current.getIdentity());
      }
    });
  };
  const handleLogout = async () => {
    authClient.current.logout();
    setPrincipal(await authClient.current.getIdentity());
  };
  const whoami = useCallback(() => {
    const idFactory = ({ IDL }) => IDL.Service({ whoami: IDL.Func([], [IDL.Principal], []) });
    const canisterId = Principal.fromText(principal?.getPrincipal());
    const actor = Actor.createActor(idFactory, {
      agent: new HttpAgent({
        host: "https://gw.dfinity.network",
        identity
      }),
      canisterId
    });

    console.log(actor);
  }, [principal]);

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
