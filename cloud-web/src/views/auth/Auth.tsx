import * as React from "react";
import { Switch, Route } from "react-router-dom";
import LogOut from "./LogOut";
import LogIn from "./LogIn";

const Auth: React.FC = () => {
  return (
    <Switch>
      <Route path="/auth/logout" component={LogOut} />
      <Route path="/auth/" component={LogIn} />
    </Switch>
  );
};

export default Auth;
