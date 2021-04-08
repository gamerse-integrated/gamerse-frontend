import BackgroundImage from "@assets/5.jpg";
import Header from "@components/shared/Header";
import Loading from "@components/shared/Loading";
import { auth } from "@config/firebaseConfig";
import php from "@config/php";
import { resetScore } from "@redux/actionCreators/tictactoe";
import _ from "lodash";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import InGameChat from "./InGameChat";
import TicTacToeFriendScoreboard from "./TicTacToeFriendScoreboard";
import TicTacToeMainFriend from "./TicTacToeMainFriend";
import TTTFriendAppProvider, {
  TTTFriendAppContext,
} from "./TTTFriendAppProvider";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUB,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUB,
  uuid: process.env.REACT_APP_TITLE,
});

/*  
actualChannel: null
channel: "74_InGame"
message: "@beast / 2021-04-05T15:53:00.034Z / message / hi"
publisher: "Gamerse"
subscribedChannel: "74_InGame"
subscription: null
timetoken: "16176379802240254"
*/

export class TTTfriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      friendId: this.props.match.params.id,
      friend: null,
      userName: null,
      icon: null,
      type: this.props.match.params.type,
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.friend !== this.state.friend) {
  //     this.setState({ loading: false });
  //   }
  // }

  async componentDidMount() {
    let friends, userName, t;
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
      friends = this.props.friends;
    }

    // fetch friend data

    try {
      let res4 = await php.get("player.php");
      t = res4.data;
      t = _.map(
        t,
        _.partialRight(_.pick, ["userName", "onlineStatus", "photoURL"])
      );
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
      friends = values
        .map((p) => ({
          friend: p["userName"],
          id: p["id"],
          status: p["status"],
          photoURL: p["photoURL"],
          onlineStatus:
            new Date(parseInt(p["onlineStatus"])).getTime() + 6 * 1000 >
            new Date().getTime()
              ? "online"
              : "offline",
        }))
        .filter((f) => f["id"] === this.state.friendId);

      let icon =
        String(userName).localeCompare(String(friends[0].friend)) === 1
          ? "X"
          : "O";

      this.setState(
        { friend: friends[0], userName: userName, icon: icon, loading: false },
        () => {
          // $("#SetGameTypeHuman").click();
          // console.log(this.state);
        }
      );
    } catch (e) {
      // error fetching friend data ==>  abort
    }
  }
  componentWillUnmount() {
    // this.sendMessage("USER_LEFT");
    this.props.resetScore();
  }
  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div>
        <TTTFriendAppProvider icon={this.state.icon}>
          <PubNubProvider client={pubnub}>
            <audio
              className="d-none"
              autoPlay
              src="https://d1o44v9snwqbit.cloudfront.net/musicfox_demo_MF-4006.mp3"
              loop
            ></audio>
            <div
              className="w-100"
              style={{
                // filter: "blur(4px)",
                boxShadow: "0 0 100rem 1rem white inset",
                position: `absolute`,
                height: `100vh`,
                zIndex: -1,
                top: 0,
                left: 0,
                background: `url(${BackgroundImage})`,
                backgroundPosition: `center`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `cover`,
                backgroundColor: `#fff`,
                filter: "blur(4px)",
                transform: "scale(1.1)",
              }}
            />
            <div className="d-flex min-vh-100 flex-column">
              <Route
                component={(props) => <Header color="" {...props}></Header>}
              ></Route>
              <div className="flex-grow-1 d-flex flex-row">
                <div className="col-5 mx-auto d-flex bg- flex-row flex-grow-1">
                  <TicTacToeMainFriend
                    type={this.state.type}
                    pubnub={pubnub}
                    userName={this.state.userName}
                    friendId={this.state.friendId}
                    friend={this.state.friend}
                    icon={this.state.icon}
                  />
                </div>
                <div className="col d-flex flex-row flex-grow-1">
                  <div className="col d-flex flex-column align-items-between">
                    <TicTacToeFriendScoreboard
                      type={this.state.type}
                      pubnub={pubnub}
                      icon={this.state.icon}
                      userName={this.state.userName}
                      friend={this.state.friend}
                    />
                  </div>
                  <div className="col">
                    <Route
                      component={(props) => (
                        <InGameChat
                          {...props}
                          pubnub={pubnub}
                          friendId={this.state.friendId}
                          userName={this.state.userName}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </PubNubProvider>
        </TTTFriendAppProvider>
      </div>
    );
  }
}

TTTfriend.contextType = TTTFriendAppContext;

const mapStateToProps = ({ tictactoe }) => ({});

const mapDispatchToProps = {
  resetScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(TTTfriend);
