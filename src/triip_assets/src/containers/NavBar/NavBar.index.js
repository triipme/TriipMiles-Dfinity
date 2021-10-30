import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Modal } from "@mui/material/index";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import { AuthClient } from "@dfinity/auth-client";

import { NavLinkStyled } from "../../components/NavLink/NavLink";
import { navbar } from "../../routers/navbar";
import { login } from "../../slice/user/userSlice";
import { ContainerStyled, FormStyled } from "./NavBar.style";
import { canisterId, createActor } from "../../../../declarations/triip";
import FormProfile from "./NavBar.form";

const NavBar = ({}) => {
  const theme = useTheme();
  const [actor, setActor] = useState();
  const [profile, setProfile] = useState();
  const [authClient, setAuthClient] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
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

  useEffect(() => {
    //if the first is auththorized, it would initActor
    if (isLogin) initActor();
  }, [isLogin]);

  useEffect(() => {
    // Read Profile
    actor?.read().then(rs => {
      console.log(rs);
      if ("ok" in rs) {
        setProfile(rs.ok);
      } else {
        setIsOpen(true);
      }
    });
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
    setActor(undefined);
    // setPrincipal(await authClient.getIdentity());
  };

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
        {!!profile ? (
          <h1>cl</h1>
        ) : (
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <FormStyled>
              <FormProfile />
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
      </div>
    </ContainerStyled>
  );
};

NavBar.propTypes = {};

export default NavBar;
