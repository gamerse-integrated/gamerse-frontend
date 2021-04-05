import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/js/all";
import "react-notifications/lib/notifications.css";
import "./fonts/stylesheet.css";
import "./index.scss";

import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@redux/store";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Route component={App}></Route>
        <NotificationContainer />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("gamerse")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
