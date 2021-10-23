import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "../containers";
import { ExperiencePage, HomePage, SharePage, ShopPage, StayPage } from "../pages";

export const Main = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route component={() => <HomePage />} exact path="/" />
        <Route component={() => <StayPage />} path="/stay" />
        <Route component={() => <ExperiencePage />} path="/experience" />
        <Route component={() => <SharePage />} path="/share" />
        <Route component={() => <ShopPage />} path="/shop" />
      </Switch>
    </Router>
  );
};
