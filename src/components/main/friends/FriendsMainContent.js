import React, { Component } from "react";
import { connect } from "react-redux";
import WalkImage from "./Walk.svg";
import TalkImage from "./TalkImage.svg";
import PendingListItem from "./PendingListItem";
import FriendListItem from "./FriendListItem";
import Chat from "./Chat";
import { Route } from "react-router-dom";
import php from "@config/php";
import { auth } from "@config/firebaseConfig";
import { Loading } from "@components/shared/Loading";
import _ from "lodash";

export class FriendsMainContent extends Component {
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
  chatWith = (id) => {
    this.setState({ chatWithId: id });
  };
  async componentDidMount() {
    setInterval(async () => {
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
        friends = values.map((p) => ({
          friend: p["userName"],
          id: p["id"],
          status: p["status"],
          photoURL: p["photoURL"],
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

      this.setState(
        {
          loading: false,
          userName: userName,
          friends: friends,
          requests: requests,
        }
        // () => console.log(this.state.friends)
      );
    }, 4 * 1000);
  }
  render() {
    if (this.state.loading) return <Loading height={"flex-grow-1"} />;
    return (
      <div>
        <div className="d-flex flex-row flex-grow-1 px-2">
          <div className="col-4 flex-grow-1 m-0 p-0">
            <ul className="list-group list-group-flushed  rounded-0">
              {this.state.friends.length ? (
                this.state.friends.map((friend, i) => {
                  // console.log(friend);
                  if (friend.status === "F")
                    return (
                      <Route
                        render={(props) => (
                          <FriendListItem
                            {...props}
                            chatWith={this.chatWith}
                            key={i}
                            photoURL={friend.photoURL}
                            id={friend.id}
                            onlineStatus={friend.onlineStatus}
                            userName={friend.friend}
                            myUsername={this.state.userName}
                          />
                        )}
                      ></Route>
                    );
                  else return <></>;
                })
              ) : (
                <div
                  className="d-flex flex-column justify-content-center align-items-start pl-5 bg-"
                  style={{ minHeight: `80vh` }}
                >
                  <span
                    className=""
                    style={{ fontSize: "2rem", fontWeight: "800" }}
                  >
                    Whoops!
                  </span>{" "}
                  <div className="m-1"></div>
                  <p className="">It seems you have no friends!</p>
                  <p>Use explore to find new friends</p>
                  <p>
                    Go to{" "}
                    <span
                      className="text-primary text-link"
                      role="button"
                      onClick={() => this.props.history.push("/explore")}
                    >
                      Explore
                    </span>
                  </p>
                </div>
              )}
            </ul>
          </div>
          <div className="col-4 flex-grow-1">
            {this.state.chatWithId ? (
              <Chat
                userName={this.state.userName}
                id={this.state.chatWithId}
              ></Chat>
            ) : (
              <div
                className="d-flex flex-column justify-content-around align-items-center bg-"
                style={{ minHeight: `80vh` }}
              >
                <p>Select a friend to chat</p>
                <img
                  src={TalkImage}
                  alt="Talk"
                  className="img-responsive w-100"
                />
              </div>
            )}
          </div>
          <div className="col-4 flex-grow-1 m-0 p-0">
            <ul className="list-group list-group-flushed  rounded-0">
              {this.state.requests.length ? (
                this.state.requests.map((request, i) => {
                  // console.log(friend);
                  return (
                    <PendingListItem
                      key={i}
                      id={request.id}
                      userName={request.pid1}
                    />
                  );
                })
              ) : (
                <div
                  className="d-flex flex-column justify-content-around align-items-center bg- p-5"
                  style={{ minHeight: `80vh` }}
                >
                  <p>No pending friend requests</p>
                  <img
                    src={WalkImage}
                    alt="All clear!"
                    className="img-responsive w-100"
                  />
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsMainContent);
