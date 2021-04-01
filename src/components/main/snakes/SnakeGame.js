import Snake from "./Snake";
import Food from "./Food";
import Poison from "./Poison";
import "./App.css";
import { Component } from "react";
import { connect } from "react-redux";
// import { updateScore } from "../../../actionCreator";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};
const getRandomCoordinates2 = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};
const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: "n",
  poison: null,
  length: 2,
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
};

export class SnakeGame extends Component {
  state = initialState;
  score = "";
  s = 0;
  game = "";
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
    setInterval(this.checklength, 5000);
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
    if (this.state.poison !== null) {
      this.checkIfEatPoison();
    }
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      default:
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];
    this.game = "";
    this.score = "";
    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        dots.push(head);
        dots.shift();
        this.setState({
          snakeDots: dots,
        });
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        dots.push(head);
        dots.shift();
        this.setState({
          snakeDots: dots,
        });
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        dots.push(head);
        dots.shift();
        this.setState({
          snakeDots: dots,
        });
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        dots.push(head);
        dots.shift();
        this.setState({
          snakeDots: dots,
        });
        break;
      default:
        head = head;
    }
  };

  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: this.gen_food(),
        length: this.state.length + 1,
      });
      this.enlargeSnake();
      this.increaseSpeed();
      this.s = this.s + 20;
    }
  }
  checkIfEatPoison() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let poison = this.state.poison;
    if (head[0] == poison[0] && head[1] == poison[1]) {
      this.setState({
        poison: this.gen_poison(),
        length: this.state.length + 1,
      });
      this.enlargeSnake();
      this.increaseSpeed();
      this.s = this.s - 40;
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }

  onGameOver() {
    this.score = "your score is " + this.s;
    this.game = "Game-Over";
    // this.props.updateScore(0);
    this.s = 0;
    this.setState(initialState);
  }
  gen_food() {
    let food = getRandomCoordinates();
    let snake = [...this.state.snakeDots];
    snake.forEach((dot) => {
      if (food[0] === dot[0] && food[1] === dot[1]) {
        this.gen_food();
      }
    });
    return food;
  }
  gen_poison() {
    let poison = getRandomCoordinates2();
    let food = this.state.food;
    let snake = [...this.state.snakeDots];
    snake.forEach((dot) => {
      if (
        (poison[0] === dot[0] && poison[1] === dot[1]) ||
        (poison[0] === food[0] && poison[1] === food[1])
      ) {
        this.gen_poison();
      }
    });
    return poison;
  }
  render() {
    return (
      <div className="game-area shadow rounded">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
        <Poison dot={this.state.poison} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  // updateScore: updateScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(SnakeGame);
