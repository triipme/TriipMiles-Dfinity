import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Modal, Typography, Box } from "@mui/material/index";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { Link, useLocation } from "react-router-dom";

import { actorSlice, login, profile } from "../../slice/user/userSlice";
import { ContainerStyled, FormStyled } from "./NavBar.style";
import { canisterId, createActor } from "../../../../declarations/triip";
import FormProfile from "./NavBar.form";
import { Images } from "../../theme";
import { LinkStyled, NavLinkStyled } from "../../components";
import { account, navbar } from "../../utils/paths";

const NavBar = () => {
  const theme = useTheme();
  // const [profile, setProfile] = useState();
  const [authClient, setAuthClient] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLogin, actor, profile: profileData } = useSelector(state => state.user);

  const location = useLocation();
  console.log(location);
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
    const actor = createActor(canisterId, {
      agentOptions: {
        identity: authClient?.getIdentity()
      }
    });
    dispatch(actorSlice(actor));
  };

  useLayoutEffect(() => {
    //if the first is auththorized, it would initActor
    if (isLogin) initActor();
  }, [isLogin]);

  useLayoutEffect(() => {
    // Read Profile
    if (!!actor.read) {
      actor?.read().then(rs => {
        console.log(rs);
        if ("ok" in rs) {
          // setProfile(rs.ok[0]);
          dispatch(profile({ ...rs?.ok[0], _id: new Principal(canisterId).toText() }));
        } else {
          setIsOpen(true);
        }
      });
    }
  }, [actor]);

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
    dispatch(profile({}));
    // setPrincipal(await authClient.getIdentity());
  };
  // console.log(profile);

  return (
    <>
      {location?.pathname !== "/triip-admin" && (
        <ContainerStyled maxWidth="xl">
          <div style={{ display: "flex", alignItems: "center" }}>
            {navbar.map((item, _) => (
              <NavLinkStyled
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive && theme.palette.secondary.main
                })}>
                {item.path === "/" ? (
                  <img style={{ display: "inline", width: 30 }} src={Images.logo} alt="" />
                ) : (
                  item.name
                )}
              </NavLinkStyled>
            ))}
          </div>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!!profileData ? (
              <LinkStyled to={account[1].nested[0].path}>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  {profileData?.user?.username}
                </Typography>
              </LinkStyled>
            ) : (
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <FormStyled>
                  <FormProfile modalState={isOpen} handleModalEvent={setIsOpen} />
                </FormStyled>
              </Modal>
            )}
            {isLogin ? (
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Box>
        </ContainerStyled>
      )}
    </>
  );
};

NavBar.propTypes = {};

export default NavBar;
