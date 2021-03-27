import React, { Component } from "react";
import { connect } from "react-redux";
// import { updateScore } from "../../../actionCreator";

export class SnakesScore extends Component {
  render() {
    return (
      <div>
        <p>Score: {this.props.score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // score: state.snakes.score,
});

const mapDispatchToProps = {
  // updateScore: updateScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(SnakesScore);
