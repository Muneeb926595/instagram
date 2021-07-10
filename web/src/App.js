import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "./@layouts/Layout";
import { Signup, Login } from "@modules";
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
            <Layout>{/* <All app Modals /> */}</Layout>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
