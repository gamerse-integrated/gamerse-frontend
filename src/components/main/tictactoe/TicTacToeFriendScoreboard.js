import { auth } from "@config/firebaseConfig";
import React, { Component } from "react";
import { connect } from "react-redux";

export class TicTacToeFriendScoreboard extends Component {
  render() {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-between shadow p-2 mb-5"
        style={{
          borderRadius: `1rem`,
          backdropFilter: `blur(10px)`,
          background: `rgba(255,255,255,.7)`,
        }}
      >
        <div className="pb-4">
          <h1>Score</h1>
        </div>
        <div className="d-flex bg- w-100 align-items-center justify-content-around">
          <div className="d-flex flex-column d-block text-center">
            <h2
              className="d-inline-block"
              style={{
                width: "3rem",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  this.props.icon === "X"
                    ? auth.currentUser.photoURL
                    : this.props.friend.photoURL
                }
                alt=""
                className="w-100"
              />
            </h2>
            <div
              className="text-center"
              style={{ fontSize: "5rem", fontWeight: "bold" }}
            >
              {this.props.score_x}
            </div>
          </div>
          <div className="d-flex flex-column d-block text-center">
            <h2
              className="d-inline-block "
              style={{
                width: "3rem",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  this.props.icon !== "X"
                    ? auth.currentUser.photoURL
                    : this.props.friend.photoURL
                }
                alt=""
                className="w-100"
              />
            </h2>
            <div
              className="text-center"
              style={{ fontSize: "5rem", fontWeight: "bold" }}
            >
              {this.props.score_o}
            </div>
          </div>
          <div className="d-flex flex-column d-block text-center">
            <h2 className="d-inline-block" style={{ overflow: "hidden" }}>
              <div
                className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "3rem",
                  height: "3rem",
                }}
              >
                T
              </div>
            </h2>
            <div
              className="text-center"
              style={{ fontSize: "5rem", fontWeight: "bold" }}
            >
              {this.props.tie}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tictactoe }) => ({
  score_x: tictactoe.score_x,
  score_o: tictactoe.score_o,
  tie: tictactoe.tie,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToeFriendScoreboard);
