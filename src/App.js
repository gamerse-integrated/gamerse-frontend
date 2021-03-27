import React, { Component } from "react";
import { auth, db } from "@config/firebaseConfig";
import Loading from "@shared/Loading";
import Welcome from "@main/welcome/Welcome";
import { USER_AUTHENTICATED, USER_NOT_AUTHENTICATED } from "./Routes";
import { NotificationManager } from "react-notifications";
import WebWorker from "@workers/WorkerSetup";
import setOnlineStatus from "@workers/OnlineStatusWorker";

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
      console.log(err);
      auth.signOut();
      NotificationManager.warning("Error fetching data");
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
          return USER_AUTHENTICATED;
        } else {
          return "Inappropriate action 🛑";
        }
      } else if (this.__authenticated === false) {
        return USER_NOT_AUTHENTICATED;
      } else return "STOP 🤚";
    }
  }
}
