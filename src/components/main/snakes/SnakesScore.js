import React, { Component } from "react";
import { connect } from "react-redux";

export class SnakesScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // highScore: 0,
    };
  }
  async componentDidMount() {
    // console.log(auth.currentUser);
    // let res = await php.get("snake-api.php", {
    //   params: { userName: this.props.userName },
    // });
    // let highScore = res.data["highscore"];
    // if (highScore) {
    //   this.setState({ highScore: highScore });
    // }
  }
  render() {
    return (
      <div>
        <p>Current Score: {this.props.score}</p>
        <p>High Score: {this.props.highScore} </p>
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
