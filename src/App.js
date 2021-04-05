import React, { Component } from "react";
import { auth, db } from "@config/firebaseConfig";
import Welcome from "@main/welcome/Welcome";
import Loading from "@shared/Loading";
import setOnlineStatus from "@workers/OnlineStatusWorker";
import WebWorker from "@workers/WorkerSetup";
import { NotificationManager } from "react-notifications";
import { UserAuthenticated, USER_NOT_AUTHENTICATED } from "./Router";
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
  }
  componentDidMount() {
    this.consoleClear = setInterval(() => {
      console.clear();
    }, 1000);
    window.addEventListener("offline", () => {
      NotificationManager.warning(
        "You are offline but you can still continue to enjoy the app"
      );
    });
    auth.onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        if (await this.checkData(user.uid)) {
          this.whereTo = "h";
        } else {
          this.whereTo = "w";
        }
        this.__authenticated = true;
        global.worker = new WebWorker(setOnlineStatus);
        global.worker.postMessage(auth.currentUser.email);
      } else {
        this.__authenticated = false;
      }
      this.setState({ loading: false });
    });
  }
  render() {
    if (this.state.loading) return <Loading />;
    else {
      if (this.__authenticated) {
        if (this.whereTo === "w") return <Welcome />;
        else if (this.whereTo === "h") return <UserAuthenticated />;
      } else return USER_NOT_AUTHENTICATED;
    }
  }
}
