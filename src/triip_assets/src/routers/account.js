import React from "react";

import { Switch, Route } from "react-router-dom";
import { MenuContainer } from "../pages/Account/container";
import { account } from "../utils/paths";

const AccountRouter = () => {
  return (
    <div style={{ padding: "40px 0", width: "100%" }}>
      <Switch>
        {account[1].nested.map(item => (
          <Route key={item.path} path={item.path} component={item.component} exact={item.exact} />
        ))}
      </Switch>
    </div>
  );
};

export default AccountRouter;
