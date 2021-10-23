import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "../containers/index";
import { navbar } from "./navbar";

export const Main = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        {navbar.map((item, _) => (
          <Route key={item.path} path={item.path} exact={item?.exact} component={item.component} />
        ))}
      </Switch>
    </Router>
  );
};
