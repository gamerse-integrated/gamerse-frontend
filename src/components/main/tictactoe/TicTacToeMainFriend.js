import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";

import {
  resetScore,
  updateScoreO,
  updateScoreTie,
  updateScoreX,
} from "@redux/actionCreators/tictactoe";

import { AppContext } from "./AppProvider";
import { GAME_TYPES, ICON_CHARS, PLAYER_TURNS } from "./common";
import "./Main.css";
import { Loading } from "@components/shared/Loading";

const ICON_PLACE_HOLDDER = "_";

const Cell = ({ sendMessage, index }) => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const value = context.cells[index];
        const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDDER;
        const isDoneClass =
          icon !== ICON_PLACE_HOLDDER ? "done text-dark" : " text-white";

        return (
          <button
            className={`cell cell-${index} ${isDoneClass}`}
            onClick={() => {
              context.humanPlay(index);
              sendMessage();
            }}
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
          <Cell sendMessage={this.props.sendMessage} index={0} />
          <Cell sendMessage={this.props.sendMessage} index={1} />
          <Cell sendMessage={this.props.sendMessage} index={2} />
        </div>

        <div className="board-row">
          <Cell sendMessage={this.props.sendMessage} index={3} />
          <Cell sendMessage={this.props.sendMessage} index={4} />
          <Cell sendMessage={this.props.sendMessage} index={5} />
        </div>

        <div className="board-row">
          <Cell sendMessage={this.props.sendMessage} index={6} />
          <Cell sendMessage={this.props.sendMessage} index={7} />
          <Cell sendMessage={this.props.sendMessage} index={8} />
        </div>
      </div>
    );
  }
}
Board.contextType = AppContext;

export class TicTacToeMainFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
      loading: true,
      icon: null,
    };
  }

  sendMessage = () =>
    this.props.pubnub.publish({
      channel: this.props.friendId,
      message: this.props.icon,
    });

  handleMessage = (event) => {
    const message = event.message;
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message;
      this.setState((prevState) => {
        return { messages: [...prevState.messages, text] };
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.icon !== this.props.icon) {
      this.setState(
        {
          icon: this.props.icon,
          loading: false,
        },
        () => {
          this.props.pubnub.addListener({ message: this.handleMessage });
          this.props.pubnub.subscribe({ channels: [this.props.friendId] });
        }
      );
    }
  }

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
    if (this.state.loading) return <Loading height=" " />;
    return (
      <main className="main">
        <h1 className="info">{textInfo}</h1>
        <Board sendMessage={this.sendMessage} />
      </main>
    );
  }
}

TicTacToeMainFriend.contextType = AppContext;

const mapStateToProps = ({ tictactoe }) => ({});

const mapDispatchToProps = {
  updateScoreX,
  updateScoreO,
  updateScoreTie,
  resetScore,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicTacToeMainFriend);
