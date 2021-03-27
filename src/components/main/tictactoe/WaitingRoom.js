import { auth, db } from "@config/firebaseConfig";
import php from "@config/php";
import React, { Component } from "react";
import { connect } from "react-redux";

export class WaitingRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requesters: [],
    };
  }

  componentDidMount() {
    let friendId = this.props.match.params.friendId;
    // !  send game request
    // send firestore request
    // add listener on app
    // if accepted: goto game else: go back and prompt request rejected
    // * listen w own uid
    // ! multiple requests handle
    db.collection("requests")
      .doc(friendId)
      .get()
      .then((e) => this.setState({ requesters: e.data()["requesters"] }))
      .catch((e) => console.log(e));

    db.collection("requests")
      .doc(friendId)
      .set({
        requesters: [...this.state.requesters, auth.currentUser.uid],
      })
      .then((ref) => {
        //   add extra attribute
        // if accepted send both users to game
        // else requester entry delete ==>
      });

    //
  }

  render() {
    return (
      <div>
        <p>Waiting for the other player to join</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
