import ForgotPassword from "@auth/forgotPassword/ForgotPassword";
import Login from "@auth/login/Login";
import Register from "@auth/register/Register";
import { Explore } from "@components/main/explore/Explore";
import { JoinRoom } from "@components/main/tictactoe/JoinRoom";
import TicTacToe from "@components/main/tictactoe/TicTacToe";
import TTThuman from "@components/main/tictactoe/TTThuman";
import { WaitingRoom } from "@components/main/tictactoe/WaitingRoom";
import { Loading } from "@components/shared/Loading";
import { auth, db } from "@config/firebaseConfig";
import php from "@config/php";
import Friends from "@main/friends/Friends";
import Home from "@main/Home";
import Snakes from "@main/snakes/Snakes";
import TTTai from "@main/tictactoe/TTTai";
import TTTeasy from "@main/tictactoe/TTTeasy";

import TTTfriend from "@main/tictactoe/TTTfriend";
import TicTacToeRouter from "@main/TicTacToeRouter";
import _ from "lodash";
import $ from "jquery";
import React from "react";
import { NotificationManager } from "react-notifications";
import { Redirect, Route, Switch } from "react-router-dom";

export const USER_NOT_AUTHENTICATED = (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgot" component={ForgotPassword} />
    <Redirect to="/login" />
  </Switch>
);

export class UserAuthenticated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userName: null,
    };
  }

  async componentDidMount() {
    let friends, userName;

    // *get friends using username
    try {
      let result_1 = await php.get("player.php", {
        params: {
          email: auth.currentUser.email,
        },
      });
      userName = result_1.data["userName"];

      // * after fetching username, now fetching friends list
      let result_2 = await php.get("friends.php", {
        params: {
          userName: userName,
        },
      });
      friends = result_2.data;
    } catch (e) {
      friends = [];
    }

    // * format friends array
    try {
      let result_3 = await php.get("player.php");
      let t = result_3.data;
      t = _.map(t, _.partialRight(_.pick, ["userName", "onlineStatus"]));
      let fl = friends.filter((f) => f["status"] === "F");
      let flnames = _.map(fl, "friend");
      t = t.filter((p) => flnames.includes(p["userName"]));
      fl = fl.map((p) => ({
        userName: p["friend"],
        id: p["id"],
        status: p["status"],
      }));
      let merged = _.merge(_.keyBy(t, "userName"), _.keyBy(fl, "userName"));
      let values = _.values(merged);
      friends = values.map((p) => ({
        friend: p["userName"],
        id: p["id"],
        status: p["status"],
        onlineStatus:
          new Date(parseInt(p["onlineStatus"])).getTime() + 6 * 1000 >
          new Date().getTime()
            ? "online"
            : "offline",
      }));
    } catch (e) {
      friends = [];
    }

    // * new message notifications

    let friendsIds = _.map(friends, "id");
    this.unsubscribe = db.collection("chats").onSnapshot((querySnapshot) => {
      let docs = querySnapshot.docs.filter((d) => friendsIds.includes(d.id));
      docs.forEach((doc) => {
        let user = doc.data().lastSenderUsername;
        let challenge = doc.data().challenge;
        if (user !== userName && user !== "") {
          if (challenge === true) {
            NotificationManager.warning(
              `${user} has challenged you to a game`,
              "Challenge"
            );
          }
          if (challenge === false) {
            NotificationManager.info(
              `${user} sent you a new message`,
              "New message"
            );
          }

          db.collection("chats").doc(doc.id).update({
            challenge: false,
            lastSenderUsername: "",
          });
        }
      });
    });

    // * tooltips

    // $(function () {
    //   $('[data-toggle="tooltip"]').tooltip();
    //   $('[data-toggle="tooltip"]').tooltip("hide");
    // });

    // * load component

    this.setState(
      {
        loading: false,
        userName: userName,
      },
      () => {
        NotificationManager.success(`Welcome ${userName}`);
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    global.worker.terminate();
  }

  render() {
    if (this.state.loading) return <Loading></Loading>;
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={(props) => (
            <Home {...props} userName={this.state.userName} />
          )}
        ></Route>
        <Route exact path="/friends" component={Friends}></Route>
        <Route exact path="/explore" component={Explore}></Route>
        <Route exact path="/tictactoe" component={TicTacToeRouter}></Route>
        <Route exact path="/snakes" component={Snakes}></Route>
        <Route exact path="/ttteasy" component={TTTeasy}></Route>
        <Route exact path="/ttthuman" component={TTThuman}></Route>
        <Route exact path="/waiting-room/:id" component={WaitingRoom}></Route>
        {/* <Route exact path="/joinroom" component={JoinRoom}></Route> */}
        <Route exact path="/tttfriend/:id" component={TTTfriend}></Route>
        <Route exact path="/tttai" component={TTTai}></Route>
        <Redirect to="/" />
      </Switch>
    );
  }
}
