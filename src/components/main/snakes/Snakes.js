import React, { Component } from "react";
// import { auth } from "@config/firebaseConfig";
import SnakeGame from "./SnakeGame";
import SnakesScore from "./SnakesScore";
import Header from "@shared/Header";
import { Route } from "react-router-dom";
import php from "@config/php.js";
import { auth } from "@config/firebaseConfig.js";
export class Snakes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      highScore: 0,
    };
  }
  async componentDidMount() {
    let res1 = await php.get("player.php", {
      params: {
        email: auth.currentUser.email,
      },
    });
    let userName = res1.data["userName"];
    this.setState({ userName: userName });
    // console.log(res1);
    // console.log(userName);
    // console.log("sending highscore req");
    let res2 = await php.get("snake-api.php", {
      params: {
        userName: userName,
      },
    });
    console.log(res2);
    let highScore = res2.data["highscore"];
    this.setState({ highScore: highScore });
  }
  updateScore = (score) => {
    // ho gaya, u can close it now
    this.setState({ score: score });
  };
  updateHighScore = () => {
    php
      .get("snake-api.php", {
        params: {
          userName: this.state.userName,
        },
      })
      .then((res) => {
        console.log(res);
        let highScore = res.data["highscore"];
        this.setState({ highScore: highScore, score: 0 });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="min-vh-100 game-container d-flex flex-column">
        <header>
          <Route component={(props) => <Header {...props}></Header>}></Route>
        </header>
        <div className="d-flex flex-grow-1">
          <div className="col-7 d-flex flex-column justify-content-center align-items-center">
            <SnakeGame
              updateScore={this.updateScore}
              userName={this.state.userName}
              updateHighScore={this.updateHighScore}
            />
          </div>
          <div className="col-5">
            <SnakesScore
              score={this.state.score}
              userName={this.state.userName}
              highScore={this.state.highScore}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Snakes;
