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
      <div
        style={{
          borderRadius: `1rem`,
          width: `30vw`,
          height: `40vh`,
          backdropFilter: `blur(10px)`,
          background: `rgba(255,255,255,.7)`,
        }}
        className="p-5 shadow"
      >
        <p>
          <h1>Current Score:</h1> <div className="lead">{this.props.score}</div>
        </p>
        <p>
          <h1>High Score:</h1>{" "}
          <div className="lead">{this.props.highScore} </div>
        </p>
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
