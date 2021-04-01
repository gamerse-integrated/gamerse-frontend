import React, { Component } from "react";
import { connect } from "react-redux";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import php from "@config/php";
import { NotificationManager } from "react-notifications";
import { auth, db } from "@config/firebaseConfig";

export class FriendListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
    };
  }
  openChat = () => {
    //open corresponding chat
  };
  removeFriend = (id) => {
    php
      .post("friends.php", { action: "R", friendRecordId: id })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  challenge = (id) => {
    // challenge to TTT
    php
      .post("friends.php", {
        friendid: this.state.id,
        message:
          "@" +
          this.props.userName +
          " / " +
          new Date().toISOString() +
          " / " +
          "code / " +
          this.state.id,
      })
      .then((e) => {
        db.collection("chats")
          .doc(this.state.id)
          .update({
            count: Math.floor(Math.random() * 100),
            lastSenderUsername: this.props.myUsername,
            challenge: true,
            challenger: this.props.myUsername,
            challengee: this.props.userName,
          })
          .then(() => {
            NotificationManager.warning("Challenge sent");
            this.props.history.push(`/waiting-room/${this.props.id}`);
          });
      });
  };

  componentDidMount() {
    this.setState({ id: this.props.id });
  }

  render() {
    return (
      <div className="" onClick={() => this.props.chatWith(this.props.id)}>
        <ContextMenuTrigger id="same_unique_identifier">
          <li
            className="li list-group-item d-flex flex-row my-2 mx-1 px-2 py-1"
            style={{ borderRadius: "1rem" }}
            role="button"
            onClick={this.openChat}
          >
            <div className="media w-100 h-100 align-items-center">
              <img
                alt="Person"
                src={this.props.photoURL}
                className="img-responsive rounded-circle shadow-sm"
                style={{
                  width: "3.2em",
                  height: "3.2em",
                }}
              />
              <div className="ml-4 media-body d-flex align-items-center">
                <p className="p-0 m-0">{this.props.userName}</p>
              </div>
              <div className="">
                {this.props.onlineStatus === "online" ? (
                  <span className="badge badge-success">Online</span>
                ) : (
                  <span className="badge badge-danger">Offline</span>
                )}
              </div>
            </div>
          </li>

          <ContextMenu
            id="same_unique_identifier"
            className="d-flex flex-column bg-white shadow p-1"
            style={{ borderRadius: "1rem" }}
          >
            <MenuItem
              className="btn"
              onClick={() => this.challenge(this.state.id)}
            >
              Challenge {this.state.id}
            </MenuItem>
            <MenuItem
              className="btn text-danger font-weight-bold"
              onClick={() => this.removeFriend(this.state.id)}
            >
              Remove
            </MenuItem>
          </ContextMenu>
        </ContextMenuTrigger>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FriendListItem);
