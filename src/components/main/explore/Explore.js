import { auth } from "@config/firebaseConfig";
import php from "@config/php";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { NotificationManager } from "react-notifications";

export class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      players: [],
    };
    // this.sendFriendRequest = this.sendFriendRequest.bind();
  }

  async componentDidMount() {
    //   get username
    let res = await php.get("player.php", {
      params: {
        email: auth.currentUser.email,
      },
    });
    let userName = res.data["userName"];

    // player list
    res = await php.get("player.php");
    let players = res.data;
    // console.log(players);
    /* 
    0: {userName: "atharva", nickName: "superMario"}
    1: {userName: "beast", nickName: "Nish"}
    2: {userName: "gopal", nickName: "waja"}
    */
    // get friends list
    res = await php.get("friends.php", {
      params: {
        userName: userName,
      },
    });
    let friends = res.data;
    // console.log(friends);
    /*  
    0: {id: "2", friend: "gopal", status: "F"}
    */
    // filter out friends from player
    players = _.map(players, "userName");
    friends = _.map(friends, "friend");
    // console.log(players);
    // console.log(friends);
    players = players.filter((p) => !friends.includes(p));
    this.setState({
      userName: userName,
      players: players.filter((p) => p !== userName),
    });
    // console.log(players);
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
          {this.state.players.length &&
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
