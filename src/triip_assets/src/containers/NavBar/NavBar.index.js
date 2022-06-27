import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Modal, Typography, Box, Link } from "@mui/material/index";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { useLocation } from "react-router-dom";

import { actorMain, login, profile } from "../../slice/user/userSlice";
import { ContainerStyled, FormStyled } from "./NavBar.style";
import { canisterId, createActor } from "../../../../declarations/triip";
import {
  canisterId as canisterIdTransfer,
  createActor as createActorTransfer
} from "../../../../declarations/triip_icp";
import FormProfile from "./NavBar.form";
import { Images } from "../../theme";
import { LinkStyled, NavLinkStyled } from "../../components";
import { account, navbar } from "../../routers";

import useMediaQuery from "@mui/material/useMediaQuery";
import { Divider } from "@mui/material";
import { Icon } from "@iconify/react";
import menu2Outline from "@iconify/icons-eva/menu-2-outline";
import { useNavigate } from "react-router";
import { storageAPI } from "../../slice/user/thunk";

const NavBar = () => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  // const [profile, setProfile] = useState();
  const [authClient, setAuthClient] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, actor, profile: profileData } = useSelector(state => state.user);

  const location = useLocation();
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
    const actor_main = createActor(canisterId, {
      agentOptions: {
        identity: authClient?.getIdentity()
      }
    });
    dispatch(actorMain(actor_main));
    dispatch(storageAPI());
  };

  useLayoutEffect(() => {
    //if the first is auththorized, it would initActor
    if (isLogin) initActor();
  }, [isLogin]);

  useLayoutEffect(() => {
    // Read Profile
    if (!!actor.read) {
      actor?.read().then(rs => {
        if ("ok" in rs) {
          // setProfile(rs.ok[0]);
          dispatch(profile({ ...rs?.ok[0], _id: rs?.ok[1] }));
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
    dispatch(actorMain({}));
    navigate("/");
    // setPrincipal(await authClient.getIdentity());
  };
  // console.log(profile);

  /* Mobile */
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  useEffect(() => {
    if (isOpenMenu) {
      // Get the current page scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted,
      // set this to the previous value
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    } else {
      window.onscroll = () => {};
    }
  }, [isOpenMenu]);
  return (
    <>
      {!/\btriip-admin/.test(location.pathname) && (
        <ContainerStyled maxWidth="xl">
          {isSM ? (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <NavLinkStyled to="/">
                  <img style={{ display: "inline", width: 30 }} src={Images.logo} alt="" />
                </NavLinkStyled>
                <LinkStyled href="https://stay.triip.me/">Stay</LinkStyled>
                <LinkStyled href="https://experience.triip.me/">Experience</LinkStyled>
                <LinkStyled href="https://share.triip.me/">Share</LinkStyled>
                <LinkStyled href="https://shopping.triip.me/">Shop</LinkStyled>
                <NavLinkStyled to="/metaverse">Metaverse</NavLinkStyled>
                <NavLinkStyled to="/game">Game</NavLinkStyled>
                <NavLinkStyled to="/ar">AR (Test)</NavLinkStyled>
              </div>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!!profileData?.user ? (
                  <NavLinkStyled to="/account/me">
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      {profileData?.user?.username}
                    </Typography>
                  </NavLinkStyled>
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
            </>
          ) : (
            <Box width="100%" display="flex" justifyContent="center" position="relative">
              <Box position="absolute" left={10} onClick={() => setIsOpenMenu(!isOpenMenu)}>
                {isOpenMenu ? (
                  <Icon icon="ei:close" />
                ) : (
                  <Icon icon={menu2Outline} width={24} height={24} />
                )}
              </Box>
              <NavLinkStyled onClick={() => setIsOpenMenu(false)} to="/">
                <img style={{ display: "inline", width: 30 }} src={Images.logo} alt="" />
              </NavLinkStyled>
              <Box hidden={!isOpenMenu} position="absolute" top={40} width="100%" zIndex={2}>
                <Box
                  height="100vh"
                  sx={{ backgroundColor: "#fff", display: "flex", flexDirection: "column" }}>
                  <LinkStyled
                    sx={{
                      my: 1
                    }}
                    href="https://stay.triip.me/">
                    Stay
                  </LinkStyled>
                  <LinkStyled
                    sx={{
                      my: 1
                    }}
                    href="https://experience.triip.me/">
                    Experience
                  </LinkStyled>
                  <LinkStyled
                    sx={{
                      my: 1
                    }}
                    href="https://share.triip.me/">
                    Share
                  </LinkStyled>
                  <LinkStyled
                    sx={{
                      my: 1
                    }}
                    href="https://shopping.triip.me/">
                    Shop
                  </LinkStyled>
                  <NavLinkStyled
                    onClick={() => setIsOpenMenu(false)}
                    sx={{
                      my: 1
                    }}
                    to="/metaverse">
                    Metaverse
                  </NavLinkStyled>
                  <NavLinkStyled
                    onClick={() => setIsOpenMenu(false)}
                    sx={{
                      my: 1
                    }}
                    to="/game">
                    Game
                  </NavLinkStyled>
                  <NavLinkStyled
                    onClick={() => setIsOpenMenu(false)}
                    sx={{
                      my: 1
                    }}
                    to="/ar">
                    AR (Test)
                  </NavLinkStyled>
                  <Divider sx={{ my: 3 }} />
                  {!!profileData?.user ? (
                    <>
                      <NavLinkStyled to="">
                        <Typography variant="body1" sx={{ my: 4, mr: 2 }}>
                          {profileData?.user?.username}
                        </Typography>
                      </NavLinkStyled>
                      {account[0].children.map(item => (
                        <NavLinkStyled
                          onClick={() => setIsOpenMenu(false)}
                          sx={{ my: 1 }}
                          key={item.redirect}
                          to={item.redirect}>
                          {item.name}
                        </NavLinkStyled>
                      ))}
                    </>
                  ) : (
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                      <FormStyled>
                        <FormProfile modalState={isOpen} handleModalEvent={setIsOpen} />
                      </FormStyled>
                    </Modal>
                  )}
                  {isLogin ? (
                    <Button
                      variant="primary"
                      sx={{ width: "40%", mx: "auto" }}
                      onClick={handleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      sx={{ width: "40%", mx: "auto" }}
                      onClick={handleLogin}>
                      Login
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </ContainerStyled>
      )}
    </>
  );
};

NavBar.propTypes = {};

export default NavBar;
