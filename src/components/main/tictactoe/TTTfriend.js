import Header from "@components/shared/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import AgainstHumanScoreBoard from "./AgainstHumanScoreBoard";
import AppProvider, { AppContext } from "./AppProvider";
import { GAME_TYPES } from "./common";
import TicTacToeMainFriend from "./TicTacToeMainFriend";
import $ from "jquery";
import { resetScore } from "@redux/actionCreators/tictactoe";
import php from "@config/php";
import { auth } from "@config/firebaseConfig";
import _ from "lodash";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import Loading from "@components/shared/Loading";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUB,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUB,
  uuid: process.env.REACT_APP_TITLE,
});
export class TTTfriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      friendId: this.props.match.params.id,
      friend: null,
      userName: null,
      icon: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.friend !== this.state.friend) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    $("#SetGameTypeHuman").click();
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

      this.setState({ friend: friends[0], userName: userName, icon: icon });
    } catch (e) {
      // error fetching friend data ==>  abort
    }
  }
  componentWillUnmount() {
    this.props.resetScore();
  }
  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div>
        <AppProvider>
          <PubNubProvider client={pubnub}>
            <div className="d-flex min-vh-100 flex-column">
              <Route
                component={(props) => <Header color="" {...props}></Header>}
              ></Route>
              <div className="flex-grow-1 d-flex flex-row">
                <div className="col-6 mx-auto d-flex bg-warning flex-row flex-grow-1">
                  <TicTacToeMainFriend
                    pubnub={pubnub}
                    userName={this.state.userName}
                    friendId={this.state.friendId}
                    friend={this.state.friend}
                    icon={this.state.icon}
                  />
                </div>
                <div className="col d-flex flex-column flex-grow-1">
                  <AgainstHumanScoreBoard
                    pubnub={pubnub}
                    friend={this.state.friend}
                  />
                  <AppContext.Consumer>
                    {(context) => (
                      <>
                        <button
                          id="SetGameTypeHuman"
                          className="btn btn-primary"
                          style={{}}
                          onClick={() => {
                            context.changeType(GAME_TYPES.TWO_PLAYERS);
                            context.newGameHuman();
                          }}
                        >
                          New Game
                        </button>
                        <button
                          className="btn btn-primary mt-5"
                          style={{}}
                          onClick={this.props.resetScore}
                        >
                          Reset score
                        </button>
                      </>
                    )}
                  </AppContext.Consumer>
                  <div className="">Chat</div>
                </div>
              </div>
            </div>
          </PubNubProvider>
        </AppProvider>
      </div>
    );
  }
}

TTTfriend.contextType = AppContext;

const mapStateToProps = ({ tictactoe }) => ({});

const mapDispatchToProps = {
  resetScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(TTTfriend);
