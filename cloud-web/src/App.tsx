import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";

import store from "./store";
import client from "./api/client";
import Rooms from "./views/Rooms";
import Auth from "./views/auth/Auth";
import AuthProvider from "./components/AuthProvider";

const App: React.FC = () => {
  return (
    <main>
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/">
                <AuthProvider>
                  <Route path="/" component={Rooms} />
                </AuthProvider>
              </Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </ReduxProvider>
    </main>
  );
};

export default App;
