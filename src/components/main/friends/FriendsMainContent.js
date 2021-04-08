import { Loading } from "@components/shared/Loading";
import { auth } from "@config/firebaseConfig";
import php from "@config/php";
import { changeChatWindow, fetchData } from "@redux/actionCreators/chat";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Chat from "./Chat";
import FriendListItem from "./FriendListItem";
import PendingListItem from "./PendingListItem";
import TalkImage from "./TalkImage.svg";
import WalkImage from "./Walk.svg";

export class FriendsMainContent extends Component {
  async componentDidMount() {
    this.friendDataFetcher = setInterval(async () => {
      let friends, userName, requests, t, t_all;
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

      try {
        let res4 = await php.get("player.php");
        t = res4.data;
        t = _.map(
          t,
          _.partialRight(_.pick, ["userName", "onlineStatus", "photoURL"])
        );
        t_all = t;
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
            new Date(parseInt(p["onlineStatus"])).getTime() + 7000 >
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
        // id, pid1
        // onlineStatus, userName, photoURL
        t = t_all;
        let requestsNames = _.map(requests, "pid1");
        t = t.filter((p) => requestsNames.includes(p["userName"]));
        // requests = t;
        t = t.map((p) => ({
          pid1: p["userName"],
          photoURL: p["photoURL"],
        }));
        requests = _.merge(_.keyBy(requests, "pid1"), _.keyBy(t, "pid1"));
        let ans = [];
        Object.keys(requests).forEach((key) =>
          ans.push({
            pid1: key,
            photoURL: requests[key].photoURL,
            id: requests[key].id,
          })
        );
        // console.log(ans);
        requests = ans;
      } catch (e) {
        requests = this.props.requests;
      }

      this.props.fetchData({
        loading: false,
        userName: userName,
        friends: friends,
        requests: requests,
      });
    }, parseInt(process.env.REACT_APP_FRIEND_DATA_FETCH_INTERVAL));
  }

  componentWillUnmount() {
    clearInterval(this.friendDataFetcher);
    this.props.changeChatWindow(null);
  }

  render() {
    if (this.props.loading)
      return <Loading height={"flex-grow-1"} text={<p>Fetching data</p>} />;
    return (
      <div>
        <div className="d-flex flex-row flex-grow-1 px-2">
          <div className="col-4 flex-grow-1 m-0 p-0">
            <ul className="list-group list-group-flushed  rounded-0">
              {this.props.friends.length ? (
                this.props.friends.map((friend, i) => {
                  if (friend.status === "F")
                    return (
                      <Route
                        render={(props) => (
                          <FriendListItem
                            {...props}
                            chatWith={this.chatWith}
                            key={`${friend.friend}-${i}`}
                            photoURL={friend.photoURL}
                            id={friend.id}
                            onlineStatus={friend.onlineStatus}
                            userName={friend.friend}
                            myUsername={this.props.userName}
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
                      className="btn-link"
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
            {this.props.chatWithId ? (
              <Chat></Chat>
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
              {this.props.requests.length ? (
                this.props.requests.map((request, i) => {
                  return (
                    <PendingListItem
                      key={`${request.id}-${i}`}
                      id={request.id}
                      userName={request.pid1}
                      photoURL={request.photoURL}
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

const mapStateToProps = ({ chatReducer }) => ({
  loading: chatReducer.loading,
  userName: chatReducer.userName,
  requests: chatReducer.requests,
  players: chatReducer.players,
  friends: chatReducer.friends,
  chatWithId: chatReducer.chatWithId,
});

const mapDispatchToProps = {
  fetchData,
  changeChatWindow,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsMainContent);
