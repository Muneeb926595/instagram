import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "./@layouts/Layout";
import {
  Signup,
  Login,
  Home,
  Igtv,
  Profile,
  Explore,
  Saved,
  Settings,
} from "@modules";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="background"></div>
      <Suspense fallback={<div>Loading..</div>}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Signup} />

            <Layout>
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/igtv" component={Igtv} />
              <Route exact path="/saved" component={Saved} />
              <Route exact path="/settings" component={Settings} />
            </Layout>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
