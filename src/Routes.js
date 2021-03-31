import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "@auth/login/Login";
import Register from "@auth/register/Register";
import ForgotPassword from "@auth/forgotPassword/ForgotPassword";
import Home from "@main/Home";
import TicTacToeRouter from "@main/TicTacToeRouter";
import Snakes from "@main/snakes/Snakes";
import TTTeasy from "@main/tictactoe/TTTeasy";
import TTTai from "@main/tictactoe/TTTai";
import TTTfriend from "@main/tictactoe/TTTfriend";
// import TTThuman from "@main/tictactoe/TTThuman";
import Friends from "@main/friends/Friends";
import { Explore } from "@components/main/explore/Explore";
import { auth, db } from "@config/firebaseConfig";
import php from "@config/php";
import _ from "lodash";
import { Loading } from "@components/shared/Loading";
import { NotificationManager } from "react-notifications";
import TicTacToe from "@components/main/tictactoe/TicTacToe";
import TTThuman from "@components/main/tictactoe/TTThuman";

export class UserAuthenticated extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      userName: null,
      friends: [],
      requests: [],
      chatWithId: null,
    };
  }

  async componentDidMount() {
    let friends, userName, requests;
    try {
      let res1 = await php.get("player.php", {
        params: {
          email: auth.currentUser.email,
        },
      });
      userName = res1.data["userName"];
      // console.log(userName);
      let res2 = await php.get("friends.php", {
        params: {
          userName: userName,
        },
      });
      friends = res2.data;
    } catch (e) {
      friends = this.state.friends;
    }

    try {
      let res4 = await php.get("player.php");
      let t = res4.data;
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
    } catch (e) {}

    try {
      let res3 = await php.get("friends.php", {
        params: {
          fr: true,
          userName: userName,
        },
      });
      requests = res3.data;
    } catch (e) {
      requests = this.state.requests;
    }

    // notification logic

    let friendsIds = _.map(friends, "id");

    // for (let index = 0; index < friendsIds.length; index++) {
    //   const id = friendsIds[index];
    //   console.log("Inside for loop");
    //   // .where("id", "==", id)
    // }

    db.collection("chats").onSnapshot((querySnapshot) => {
      let docs = querySnapshot.docs.filter((d) => friendsIds.includes(d.id));
      // console.log(docs.map((d) => d.data()));
      // console.log(querySnapshot.docs.map((d) => d.data()));
      docs.forEach((doc) => {
        // console.log(doc);
        let user = doc.data().lastSenderUsername;
        if (user !== userName && user !== "") {
          // console.log("New message!");
          NotificationManager.info(
            `${user} sent you a new message`,
            "New message"
          );
          db.collection("chats").doc(doc.id).update({
            lastSenderUsername: "",
          });
        }
      });
    });

    this.setState({
      loading: false,
      userName: userName,
      friends: friends,
      requests: requests,
    });
  }

  componentWillUnmount() {
    // this.listener.u;
  }

  render() {
    if (this.state.loading) return <Loading></Loading>;
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/friends" component={Friends}></Route>
        <Route exact path="/explore" component={Explore}></Route>
        <Route exact path="/tictactoe" component={TicTacToeRouter}></Route>
        <Route exact path="/snakes" component={Snakes}></Route>
        <Route exact path="/ttteasy" component={TicTacToe}></Route>
        <Route exact path="/ttthuman" component={TTThuman}></Route>
        <Route exact path="/tttfriend/:id" component={TTTfriend}></Route>
        <Route exact path="/tttai" component={TTTai}></Route>

        <Redirect to="/" />
      </Switch>
    );
  }
}

const USER_NOT_AUTHENTICATED = (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgot" component={ForgotPassword} />
    <Redirect to="/login" />
  </Switch>
);

export { USER_NOT_AUTHENTICATED };
