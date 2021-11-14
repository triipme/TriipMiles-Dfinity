import React, { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "../containers/index";
import { actorSlice } from "../slice/user/userSlice";

import { navbar, account } from "../utils/paths";

const ActorContext = createContext();

const Main = () => {
  const dispatch = useDispatch();
  const handleActor = data => {
    dispatch(actorSlice(data));
  };
  return (
    <Router>
      <NavBar handleActor={handleActor} />
      <Switch>
        {navbar.map((item, _) => (
          <Route key={item.path} path={item.path} exact={item?.exact} component={item.component} />
        ))}
        <Route key={account[0].path} path={account[0].path} component={account[0].component} />
      </Switch>
    </Router>
  );
};

export { Main, ActorContext };
