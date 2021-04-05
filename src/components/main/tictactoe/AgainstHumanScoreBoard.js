import React, { Component } from "react";
import { connect } from "react-redux";

export class AgainstHumanScoreBoard extends Component {
  render() {
    return (
      <div className="text-dark">
        <p>X:{this.props.score_x / 2}</p>
        <p>O:{this.props.score_o / 2}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ tictactoe }) => ({
  score_x: tictactoe.score_x,
  score_o: tictactoe.score_o,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgainstHumanScoreBoard);
