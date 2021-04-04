import { Header } from "@components/shared/Header";
import { auth } from "@config/firebaseConfig";
import php from "@config/php";
import _ from "lodash";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { Route } from "react-router";
import BackgroundImage from "@assets/4.webp";
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
        <div
          className="w-100"
          style={{
            position: `absolute`,
            height: `100vh`,
            zIndex: -1,
            top: 0,
            left: 0,
            background: `url(${BackgroundImage})`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#000000ff`,
          }}
        />
        <div className="container">
          <h1 className="text-center text-white">Explore</h1>
          <form className="text-center mx-auto my-5">
            <input
              type="search"
              name="q"
              id="q"
              placeholder="Search players"
              // onChange={}
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
                    backdropFilter: `blur(10px)`,
                    background: `rgba(255,255,255,.7)`,
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
