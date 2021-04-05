import { db } from "@config/firebaseConfig";
import php from "@config/php";
import { acceptRequest, rejectRequest } from "@redux/actionCreators/chat";
import React, { Component } from "react";
import { NotificationManager as nm } from "react-notifications";
import { connect } from "react-redux";
class PendingListItem extends Component {
  addFriend = (id) => {
    php
      .post("friends.php", { action: "A", friendRecordId: id })
      .then((res) =>
        db
          .collection("chats")
          .doc(id)
          .set({
            count: 0,
            lastSenderUsername: "",
            challenge: false,
            challenger: "",
            challengee: "",
          })
          .then(() => this.props.acceptRequest(id))
      )
      .catch((error) => nm.error("An unexpected error has occured"));
  };

  rejectFriend = (id) => {
    php
      .post("friends.php", { action: "R", friendRecordId: id })
      .then(() => this.props.rejectRequest(id))
      .catch((error) => nm.error("An unexpected error has occured"));
  };

  render() {
    return (
      <div>
        <div className="">
          <li
            className="li list-group-item d-flex flex-row my-2 mx-1 px-2 py-1 shadow border-0"
            style={{ borderRadius: "1rem" }}
            onClick={this.openChat}
          >
            <div className="media w-100 h-100 align-items-center">
              <img
                alt="Person"
                src={this.props.ownProps.photoURL}
                className="img-responsive rounded-circle shadow-sm"
                style={{
                  width: "3.2em",
                  height: "3.2em",
                }}
              />
              <div className="ml-4 media-body d-flex align-items-center">
                <p className="p-0 m-0">{this.props.ownProps.userName}</p>
              </div>
              <div
                className="d-flex flex-row justify-content-between "
                style={{ width: "30%" }}
              >
                <div>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => this.addFriend(this.props.ownProps.id)}
                  >
                    Accept
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.rejectFriend(this.props.ownProps.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </li>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chatReducer }, ownProps) => ({
  state: chatReducer,
  ownProps,
});

const mapDispatchToProps = {
  acceptRequest,
  rejectRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PendingListItem);
