import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "@config/firebaseConfig";
import { Link } from "react-router-dom";
import "./Friends.scss";
import FriendListItem from "./FriendListItem";
import Chat from "./Chat";
import php from "@config/php";
import PendingListItem from "./PendingListItem";
import _ from "lodash";
import { Loading } from "@components/shared/Loading";
import WebWorker from "@workers/WorkerSetup";
import friendsDataFetcher from "@workers/friendsDataFetcher";
// chatbox
// www.npmjs.com/package/chat-ui-react ==> using cdn

// API for context menu dependency
// https://github.com/vkbansal/react-contextmenu/blob/master/docs/api.md
export class Friends extends Component {
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
    global.friendsDataFetcher = new WebWorker(friendsDataFetcher);
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

      this.setState({
        loading: false,
        userName: userName,
        friends: friends,
        requests: requests,
      });
    }, 4 * 1000);
  }

  render() {
    if (this.state.loading) return <Loading></Loading>;
    else
      return (
        <div>
          <div className="min-vh-100 bg-light d-flex flex-column">
            <div
              className=" d-flex justify-content-between py-2 px-3 align-items-center "
              style={{ border: "none" }}
            >
              <div className="">
                <Link to="/" className="" style={{ textDecoration: "none" }}>
                  <h2>Gamerse</h2>
                </Link>
              </div>

              <div className="dropdown nav-item">
                <img
                  // src="https://via.placeholder.com/150"
                  src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                  alt="Profile"
                  className="img-responsive rounded-circle shadow"
                  style={{
                    width: "3.2em",
                    height: "3.2em",
                  }}
                  role="button"
                  data-toggle="dropdown"
                />
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-item">Profile</div>
                  <div className="dropdown-item" onClick={() => auth.signOut()}>
                    Logout
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-row flex-grow-1">
              <div className="col-4 flex-grow-1 m-0 p-0">
                <ul className="list-group list-group-flushed  rounded-0">
                  {this.state.friends.length
                    ? this.state.friends.map((friend, i) => {
                        // console.log(friend);
                        if (friend.status === "F")
                          return (
                            <FriendListItem
                              chatWith={this.chatWith}
                              key={i}
                              id={friend.id}
                              onlineStatus={friend.onlineStatus}
                              userName={friend.friend}
                            />
                          );
                      })
                    : "No friends"}
                </ul>
              </div>
              <div className="col-4 flex-grow-1">
                {this.state.chatWithId ? (
                  <Chat
                    userName={this.state.userName}
                    id={this.state.chatWithId}
                  ></Chat>
                ) : (
                  "Select a friend to chat with"
                )}
              </div>
              <div className="col-4 flex-grow-1 m-0 p-0">
                <ul className="list-group list-group-flushed  rounded-0">
                  {this.state.requests.length
                    ? this.state.requests.map((request, i) => {
                        // console.log(friend);
                        return (
                          <PendingListItem
                            key={i}
                            id={request.id}
                            userName={request.pid1}
                          />
                        );
                      })
                    : "No pending friend requests"}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
