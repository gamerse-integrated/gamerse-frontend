import { auth, db } from "@config/firebaseConfig";
import php from "@config/php";
import React, { Component } from "react";
import { connect } from "react-redux";

export class WaitingRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      playerCount: null,
    };
  }

  componentDidMount() {
    let friendId = this.props.match.params.id;
    // console.log(friendId);
    // challenger: check,
    // challengee: check,
    // checker 0-1-2
    // proceed to game
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
