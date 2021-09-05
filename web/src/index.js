import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";

import * as serviceWorker from "./serviceWorker";
import store from "../src/@store";
import App from "./App";
import "./index.css";
import firebase from "./@helpers/push-notifications";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
