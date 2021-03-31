import { auth } from "@config/firebaseConfig";
import php from "@config/php";
import _ from "lodash";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
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
    result = await php.get("player.php");
    let players = result.data;
    result = await php.get("friends.php", {
      params: {
        userName: userName,
      },
    });
    let friends = result.data;
    players = _.map(players, "userName");
    friends = _.map(friends, "friend");
    players = players.filter((p) => !friends.includes(p));
    this.setState({
      userName: userName,
      players: players.filter((p) => p !== userName),
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
        this.setState({ players: this.state.players.filter((p) => p !== u) });
      })
      .catch((e) => NotificationManager.error("Error sending friend request"));
  }
  render() {
    return (
      <div>
        <p>Explore</p>
        <ul className="list-group list-group-flushed">
          {this.state.players.length !== 0 &&
            this.state.players.map((u) => (
              <li className="list-group-item">
                {u}
                <button
                  className="btn btn-light"
                  onClick={() => this.sendFriendRequest(u)}
                >
                  Send Request
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Explore);
