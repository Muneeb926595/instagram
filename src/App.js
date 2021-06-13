import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "./@layouts/Layout";
import "./App.css";
import { Avatar, Border, Input } from "@components";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "@helpers/validators";

//make pages lazy that are not going to be used frequently
// const TermOfUse = lazy(() => import("@modules/TermOfUse"));
// const UpdateProfile = lazy(() => import("@modules/UpdateProfile"));
// const MyCupOfTea = lazy(() => import("@modules/MyCupOfTea/MyCupOfTea"));
// const SocialMediaSignUp = lazy(() => import("@modules/SocialMediaSignUp"));

function App() {
  return (
    <div className="App">
      <div className="background"></div>
      <Suspense fallback={<div>Loading..</div>}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <div>
                  <Border />
                  <Input validators={[VALIDATOR_EMAIL()]} />
                  <Avatar size={60} />
                  <Border />
                </div>
              )}
            />
            <Layout>{/* <All app Modals /> */}</Layout>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
