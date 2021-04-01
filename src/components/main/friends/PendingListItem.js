import React, { Component } from "react";
import php from "@config/php";
import { NotificationManager as nm } from "react-notifications";
import { db } from "@config/firebaseConfig";
import _ from "lodash";
class PendingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
  }
  addFriend = (id) => {
    console.log("inside add friend");
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
          .then(() =>
            this.setState({}, () => this.props.refreshME(this.props.pid1))
          )
      )
      .catch((error) => nm.error("An unexpected error has occured"));
  };
  rejectFriend = (id) => {
    console.log("inside reject friend");
    php
      .post("friends.php", { action: "R", friendRecordId: id })
      .then(() =>
        this.setState({}, () => this.props.refreshME(this.props.pid1))
      )
      .catch((error) => nm.error("An unexpected error has occured"));
  };
  async componentDidMount() {
    try {
      let result = await php.get("player.php");
      let t = result.data;
      t = _.map(
        t,
        _.partialRight(_.pick, ["userName", "onlineStatus", "photoURL"])
      );
      this.setState({
        photo: _.find(t, { userName: this.props.userName })["photoURL"],
      });
    } catch (e) {
      this.setState({
        photo: null,
      });
    }
  }
  render() {
    return (
      <div>
        <div className="">
          <li
            className="li list-group-item d-flex flex-row my-2 mx-1 px-2 py-1 shadow border-0"
            style={{ borderRadius: "1rem" }}
            // role="button"
            onClick={this.openChat}
          >
            <div className="media w-100 h-100 align-items-center">
              <img
                alt="Person"
                src={this.state.photo}
                className="img-responsive rounded-circle shadow-sm"
                style={{
                  width: "3.2em",
                  height: "3.2em",
                }}
              />
              <div className="ml-4 media-body d-flex align-items-center">
                <p className="p-0 m-0">{this.props.userName}</p>
              </div>
              <div
                className="d-flex flex-row justify-content-between "
                style={{ width: "30%" }}
              >
                <div>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => this.addFriend(this.props.id)}
                  >
                    Accept
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.rejectFriend(this.props.id)}
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

export default PendingListItem;
