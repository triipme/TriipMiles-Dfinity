import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "@mui/material/index";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";

import { NavLinkStyled } from "../../components/NavLink/NavLink";
import { navbar } from "../../routers/navbar";
import { login } from "../../slice/user/userSlice";
import { ContainerStyled } from "./NavBar.style";

const NavBar = ({}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const authClient = useRef(null);

  const [principal, setPrincipal] = useState();

  const { isLogin } = useSelector(state => state.user);

  useLayoutEffect(() => {
    (async () => {
      authClient.current = await AuthClient.create();
      setPrincipal(await authClient.current.getIdentity());
    })();
  }, []);
  const handleLogin = () => {
    authClient.current.login({
      // indentityProvider: "https://identity.messaging.ic0.app/#authorize",
      onSuccess: async () => {
        setPrincipal(await authClient.current.getIdentity());
      }
    });
  };
  const handleLogout = async () => {
    authClient.current.logout();
    setPrincipal(await authClient.current.getIdentity());
  };
  const whoami = useMemo(() => {
    const idFactory = ({ IDL }) => IDL.Service({ whoami: IDL.Func([], [IDL.Principal], []) });
    const canisterId = Principal.fromHex(principal?.getPrincipal() + "");
    const actor = Actor.createActor(idFactory, {
      agent: new HttpAgent({
        // host: "https://gw.dfinity.network",
        principal
      }),
      canisterId
    });
    return actor;
  }, [principal]);
  console.log("whoami", whoami);
  useLayoutEffect(() => {
    dispatch(login(!(principal?.getPrincipal() + "" === "2vxsx-fae")));
  }, [principal]);
  return (
    <ContainerStyled maxWidth="xl">
      <div>
        {navbar.map((item, _) => (
          <NavLinkStyled
            key={item.path}
            to={item.path}
            activeStyle={{
              color: !item?.exact && theme.palette.secondary.main
            }}>
            {item.name}
          </NavLinkStyled>
        ))}
      </div>
      <div>
        {isLogin ? (
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </ContainerStyled>
  );
};

NavBar.propTypes = {};

export default NavBar;
