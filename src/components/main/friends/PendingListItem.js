import React, { Component } from "react";
import php from "@config/php";
import { NotificationManager as nm } from "react-notifications";
class PendingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addFriend = (id) => {
    console.log("inside add friend");
    php
      .post("friends.php", { action: "A", friendRecordId: id })
      .then((res) => this.setState({}))
      .catch((error) => nm.error("An unexpected error has occured"));
  };
  rejectFriend = (id) => {
    console.log("inside reject friend");
    php
      .post("friends.php", { action: "R", friendRecordId: id })
      .then((res) => this.setState({}))
      .catch((error) => nm.error("An unexpected error has occured"));
  };
  render() {
    return (
      <div>
        <div className="">
          <li
            className="li list-group-item d-flex flex-row my-2 mx-1 px-2 py-1"
            style={{ borderRadius: "1rem" }}
            // role="button"
            onClick={this.openChat}
          >
            <div className="media w-100 h-100 align-items-center">
              <img
                alt="Person"
                src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
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
                style={{ width: "35%" }}
              >
                <div>
                  <button
                    className="btn btn-success"
                    onClick={() => this.addFriend(this.props.id)}
                  >
                    Accept
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-danger"
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
