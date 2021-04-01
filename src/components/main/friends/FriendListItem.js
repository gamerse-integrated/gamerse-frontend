import React, { Component } from "react";
import { connect } from "react-redux";
import php from "@config/php";
import { NotificationManager } from "react-notifications";
import { db } from "@config/firebaseConfig";
import { changeChatWindow, removeFriend } from "@redux/actionCreators/chat";

export class FriendListItem extends Component {
  removeFriend = (id) =>
    php
      .post("friends.php", { action: "R", friendRecordId: id })
      .then((res) => this.props.removeFriend(id))
      .catch((error) => console.log(error));

  challenge = (id) => {
    php
      .post("friends.php", {
        friendid: this.props.ownProps.id,
        message:
          "@" +
          this.props.myUsername +
          " / " +
          new Date().toISOString() +
          " / " +
          "code / " +
          this.props.ownProps.id,
      })
      .then((e) => {
        db.collection("chats")
          .doc(this.props.ownProps.id)
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

  render() {
    return (
      <div
        className=""
        onClick={() => this.props.changeChatWindow(this.props.id)}
      >
        <li
          className="li list-group-item d-flex flex-row my-2 mx-1 px-2 py-1 shadow border-0"
          style={{ borderRadius: "1rem" }}
          role="button"
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
              <p className="p-0 m-0">{this.props.ownProps.userName}</p>
            </div>
            <div className="">
              {this.props.ownProps.onlineStatus === "online" ? (
                <span className="badge badge-success">Online</span>
              ) : (
                <span className="badge badge-danger">Offline</span>
              )}
            </div>
            <div className="dropdown">
              <button
                className="btn-link btn dropdown-toggle"
                data-toggle="dropdown"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </button>
              <div
                className="dropdown-menu dropdown-menu-right shadow border-0 mt-2"
                style={{ borderRadius: "1.2rem" }}
              >
                <div
                  className="dropdown-item"
                  onClick={() => this.challenge(this.props.ownProps.id)}
                >
                  Challenge {this.props.ownProps.id}
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => this.removeFriend(this.props.ownProps.id)}
                >
                  Remove {this.props.ownProps.id}
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
    );
  }
}

const mapStateToProps = ({ chatReducer }, ownProps) => ({
  ownProps,
});

const mapDispatchToProps = {
  removeFriend,
  changeChatWindow,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendListItem);
