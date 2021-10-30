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
import { canisterId, createActor } from "../../../../declarations/triip";

const NavBar = ({}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [authClient, setAuthClient] = useState(undefined);
  const [principal, setPrincipal] = useState();
  const [actor, setActor] = useState();
  const [profile, setProfile] = useState();

  const { isLogin } = useSelector(state => state.user);

  useLayoutEffect(() => {
    (async () => {
      AuthClient.create().then(async client => {
        setAuthClient(client);
        dispatch(login(await client.isAuthenticated())); //check isAuthorized first time
        // setPrincipal(client.getIdentity());
      });
    })();
  }, []);

  const initActor = () => {
    console.log(canisterId);
    const actor = createActor(canisterId, {
      agentOptions: {
        identity: authClient?.getIdentity()
      }
    });
    setActor(actor);
  };

  const handleLogin = async () => {
    await authClient?.login({
      identityProvider: process.env.II_URL,
      onSuccess: async () => {
        initActor(); //init actor
        dispatch(login(await authClient.isAuthenticated())); //check isAuthorized
        // setPrincipal(await authClient.getIdentity());
      },
      onError: error => {
        console.log(error);
      }
    });
  };
  const handleLogout = async () => {
    await authClient.logout();
    dispatch(login(false));
    setActor(undefined);
    // setPrincipal(await authClient.getIdentity());
  };

  useEffect(() => {
    //if the first is auththorized, it would initActor
    if (isLogin) initActor();
  }, [isLogin]);
  // const whoami = useMemo(() => {
  //   let rs;
  //   const idFactory = ({ IDL }) => IDL.Service({ whoami: IDL.Func([], [IDL.Principal], []) });
  //   const canisterId = Principal.fromHex(principal?.getPrincipal() + "");
  //   const actor = Actor.createActor(idFactory, {
  //     agent: new HttpAgent({
  //       host: "https://gw.dfinity.network",
  //       principal
  //     }),
  //     canisterId
  //   });
  //   actor.whoami().then(pcp => {
  //     console.log(pcp);
  //     rs = pcp.toText();
  //   });
  //   return rs;
  // }, [principal]);

  useEffect(() => {
    actor?.read().then(rs => {
      console.log(rs);
      if ("ok" in rs) {
        setProfile(rs.ok);
      }
    });
  }, [actor]);
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
