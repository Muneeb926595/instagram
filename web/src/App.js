import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";

import Layout from "./@layouts/Layout";
import { Signup, Login, Home, Igtv, Profile, Saved, Modals } from "@modules";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <div className="background"></div>
      <Suspense fallback={<div>Loading..</div>}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Signup} />

            <Layout>
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/igtv" component={Igtv} />
              <Route exact path="/saved" component={Saved} />
              <Modals />
            </Layout>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
