import { auth, db } from "@config/firebaseConfig";
import Welcome from "@main/welcome/Welcome";
import Loading from "@shared/Loading";
import setOnlineStatus from "@workers/OnlineStatusWorker";
import WebWorker from "@workers/WorkerSetup";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { UserAuthenticated, USER_NOT_AUTHENTICATED } from "./Routes";
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
    } catch (err) {
      auth.signOut();
      NotificationManager.warning("An unexpected error has occured");
    }
  };
  componentDidMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        if (await this.checkData(user.uid)) {
          this.whereTo = "h";
        } else {
          this.whereTo = "w";
        }
        this.__authenticated = true;

        // * worker
        global.worker = new WebWorker(setOnlineStatus);
        global.worker.postMessage(auth.currentUser.email);
      } else {
        this.__authenticated = false;
      }
      this.setState({ loading: false });
    });
  }
  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    } else {
      if (this.__authenticated === true) {
        if (this.whereTo === "w") {
          return <Welcome></Welcome>;
        } else if (this.whereTo === "h") {
          return <UserAuthenticated></UserAuthenticated>;
        } else {
          return "Sorry, that won't work 😂";
        }
      } else if (this.__authenticated === false) {
        return USER_NOT_AUTHENTICATED;
      } else return "STOP 🤚";
    }
  }
}
