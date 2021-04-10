import React, { Component } from "react";
import { auth, db } from "@config/firebaseConfig";
import Welcome from "@main/welcome/Welcome";
import Loading from "@shared/Loading";
import setOnlineStatus from "@workers/OnlineStatusWorker";
import WebWorker from "@workers/WorkerSetup";
import { NotificationManager } from "react-notifications";
import { UserAuthenticated, USER_NOT_AUTHENTICATED } from "./Router";
import { Route } from "react-router";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  __authenticated = null;
  whereTo = null;
  checkData = async (uid) => {
    try {
      let doc = await db.collection("users").doc(uid).get();
      let data = doc.data();
      return data["hasData"];
    } catch ({ message }) {
      NotificationManager.warning(message);
      auth.signOut();
    }
  };
  componentWillUnmount() {
    clearInterval(this.consoleClear);
    /* localStorage.removeItem("FirebaseToken");
    clearInterval(this.setFirebaseToken); */
  }
  componentDidMount() {
    this.consoleClear = setInterval(() => {
      console.clear();
    }, 1000);

    auth.onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        if (await this.checkData(user.uid)) {
          this.whereTo = "h";
        } else {
          this.whereTo = "w";
        }
        /* 
        // set firebase token
        (function () {
          function setFirebaseToken() {
            localStorage.setItem("FirebaseToken", user.getIdToken());
          }
          setFirebaseToken();
          setInterval(setFirebaseToken, 30 * 1000);
        })();
 */
        this.__authenticated = true;

        // start worker
        global.worker = new WebWorker(setOnlineStatus);
        global.worker.postMessage(auth.currentUser.email);
      } else {
        /* // remove firebase token
        localStorage.removeItem("FirebaseToken");
        clearInterval(this.setFirebaseToken); */

        this.__authenticated = false;
      }
      this.setState({ loading: false });
    });
  }
  render() {
    if (navigator.onLine) {
      if (this.state.loading) return <Loading />;
      else {
        if (this.__authenticated) {
          if (this.whereTo === "w") return <Route component={Welcome} />;
          else if (this.whereTo === "h") return <UserAuthenticated />;
        } else return USER_NOT_AUTHENTICATED;
      }
    } else {
      return (
        <div>
          <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark">
            <div className="h1 text-white">You are offline</div>
          </div>
        </div>
      );
    }
  }
}
