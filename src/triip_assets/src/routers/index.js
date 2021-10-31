import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "../containers/index";
import { navbar } from "./navbar";

export const ActorContext = createContext();

export const Main = () => {
  const [actor, setActor] = useState(undefined);
  const handleActor = data => {
    setActor(data);
  };
  return (
    <ActorContext.Provider value={actor}>
      <Router>
        <NavBar handleActor={handleActor} />
        <Switch>
          {navbar.map((item, _) => (
            <Route
              key={item.path}
              path={item.path}
              exact={item?.exact}
              component={item.component}
            />
          ))}
        </Switch>
      </Router>
    </ActorContext.Provider>
  );
};
