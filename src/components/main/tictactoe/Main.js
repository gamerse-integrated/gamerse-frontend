import {
  resetScore,
  updateScoreO,
  updateScoreTie,
  updateScoreX,
} from "@redux/actionCreators/tictactoe";
import React, { Component } from "react";
import { connect } from "react-redux";
import { AppContext } from "./AppProvider";
import { GAME_TYPES, ICON_CHARS, PLAYER_TURNS } from "./common";
import "./Main.css";

const ICON_PLACE_HOLDDER = "_";

const Cell = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const value = context.cells[props.index];
        const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDDER;
        const isDoneClass =
          icon !== ICON_PLACE_HOLDDER ? "done text-dark" : " text-white";

        return (
          <button
            className={`cell cell-${props.index} ${isDoneClass}`}
            onClick={() => context.humanPlay(props.index)}
          >
            {icon}
          </button>
        );
      }}
    </AppContext.Consumer>
  );
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.context.gameState.position !== "") {
      setTimeout(() => {
        this.boardRef.current.classList.add("full");
      }, 50);
    } else {
      this.boardRef.current.classList.remove("full");
    }
  }

  render() {
    return (
      <div
        className={`board ${this.context.gameState.position}`}
        ref={this.boardRef}
      >
        <div className="board-row">
          <Cell index={0} />
          <Cell index={1} />
          <Cell index={2} />
        </div>

        <div className="board-row">
          <Cell index={3} />
          <Cell index={4} />
          <Cell index={5} />
        </div>

        <div className="board-row">
          <Cell index={6} />
          <Cell index={7} />
          <Cell index={8} />
        </div>
      </div>
    );
  }
}
Board.contextType = AppContext;

class Main extends Component {
  render() {
    let textInfo = "";
    const currentIconType = this.context.currentIcon;

    if (this.context.gameState.isTie) {
      textInfo = "Tie!";
      this.props.updateScoreTie();
    } else {
      if (this.context.gameType === GAME_TYPES.TWO_PLAYERS) {
        if (this.context.gameState.position === "") {
          textInfo = `It's player(${ICON_CHARS[currentIconType]}) turn`;
        } else {
          textInfo = `Player(${ICON_CHARS[1 - currentIconType]}) wins!`;
          let winIcon = ICON_CHARS[1 - currentIconType];
          if (winIcon === "X") this.props.updateScoreX();
          else this.props.updateScoreO();
        }
      } else {
        if (this.context.gameState.position === "") {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN)
            textInfo = `It's your turn`;
          else textInfo = `It's computer turn`;
        } else {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN) {
            textInfo = `Computer win!`;
            this.props.updateScoreX();
          } else {
            textInfo = `You win!`;
            this.props.updateScoreO();
          }
        }
      }
    }

    return (
      <main className="main mr-5">
        <h1 className="text-white info">{textInfo}</h1>
        <Board />
      </main>
    );
  }
}
Main.contextType = AppContext;
const mapStateToProps = ({ tictactoe }) => ({});

const mapDispatchToProps = {
  updateScoreX,
  updateScoreO,
  updateScoreTie,
  resetScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
