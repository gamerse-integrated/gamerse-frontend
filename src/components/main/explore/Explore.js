import { Header } from "@components/shared/Header";
import { auth } from "@config/firebaseConfig";
import php from "@config/php";
import _ from "lodash";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { Route } from "react-router";
export class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      players: [],
    };
  }
  async componentDidMount() {
    let result = await php.get("player.php", {
      params: {
        email: auth.currentUser.email,
      },
    });
    let userName = result.data["userName"];
    let players, friends;
    try {
      result = await php.get("player.php");
      players = result.data;
    } catch (e) {
      players = [];
    }
    // players = _.map(players, "userName");
    players = _.map(players, _.partialRight(_.pick, ["userName", "photoURL"]));

    try {
      result = await php.get("friends.php", {
        params: {
          userName: userName,
        },
      });
      friends = result.data;
      friends = _.map(friends, "friend");
    } catch (e) {
      friends = [];
    }

    players = players.filter((p) => !friends.includes(p["userName"]));
    this.setState({
      userName: userName,
      players: players.filter((p) => p["userName"] !== userName),
    });
  }
  sendFriendRequest(u) {
    php
      .post("friends.php", {
        friendName: u,
        userName: this.state.userName,
      })
      .then((r) => {
        NotificationManager.success("Friend request sent");
        this.setState({
          players: this.state.players.filter((p) => p["userName"] !== u),
        });
      })
      .catch((e) => NotificationManager.error("Error sending friend request"));
  }
  render() {
    return (
      <div>
        <Route component={(props) => <Header {...props} />} />
        <div className="container">
          <form className="text-center mx-auto my-5">
            <input
              type="search"
              name="q"
              id="q"
              className="form-control w-50 mx-auto"
            />
          </form>
          <div className="d-flex justify-content-around align-items-between">
            {this.state.players.length !== 0 ? (
              this.state.players.map((u) => (
                <div
                  className="d-flex flex-column justify-content-around align-items-center shadow"
                  style={{
                    borderRadius: `1rem`,
                    width: `16vw`,
                    height: `40vh`,
                  }}
                >
                  <div
                    className="text-center"
                    style={{
                      width: "8rem",
                      height: "8rem",
                    }}
                  >
                    <img
                      src={u.photoURL}
                      className="img-responsive w-100 rounded-circle"
                      alt={"userAvatar"}
                    />
                  </div>
                  <div>{u["userName"]}</div>
                  <div>
                    <button
                      className="btn btn-light"
                      onClick={() => this.sendFriendRequest(u["userName"])}
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="">
                <p>No users here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Explore);
