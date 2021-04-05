import { Loading } from "@components/shared/Loading";
import {
  resetScore,
  updateScoreO,
  updateScoreTie,
  updateScoreX,
} from "@redux/actionCreators/tictactoe";
import React, { Component } from "react";
import { connect } from "react-redux";
import { TTTFriendAppContext } from "./TTTFriendAppProvider";
import { GAME_TYPES, ICON_CHARS } from "./common";
import "./Main.css";
import $ from "jquery";

const ICON_PLACE_HOLDER = "_";

const Cell = ({ sendMessage, index }) => {
  return (
    <TTTFriendAppContext.Consumer>
      {(context) => {
        const value = context.cells[index];
        const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDER;
        const isDoneClass =
          icon !== ICON_PLACE_HOLDER ? "done text-dark" : " text-white";

        return (
          <button
            id={`cell-tttfriend-id-${index}`}
            className={`cell cell-${index} ${isDoneClass}`}
            onClick={() => {
              context.humanPlay(index);
              icon === ICON_PLACE_HOLDER && sendMessage(index);
            }}
          >
            {icon}
          </button>
        );
      }}
    </TTTFriendAppContext.Consumer>
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
Board.contextType = TTTFriendAppContext;

export class TicTacToeMainFriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moves: [],
      loading: true,
      channels: [this.props.friendId],
      flag: 0,
      index: null,
    };
  }

  sendMessage = (location) =>
    this.props.pubnub.publish({
      channel: this.props.friendId,
      message: `${this.props.icon} ${location}`,
    });

  handleMessage = (event) => {
    if (event.channel === this.props.friendId) {
      const message = event.message;
      // console.log(event);
      if (typeof message === "string" || message.hasOwnProperty("text")) {
        const text = message.text || message;
        let index = text.split(" ")[1];
        // this.context.humanPlay(index);
        $(`#cell-tttfriend-id-${index}`).click();
        this.setState(
          (prevState) => {
            return {
              moves: [...prevState.moves, text],
            };
          },
          () => {}
        );
      }
    }
  };

  componentDidMount() {
    this.props.pubnub.addListener({ message: this.handleMessage });
    this.props.pubnub.subscribe({ channels: [this.props.friendId] });
    this.setState({ loading: false });
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
          let icon = ICON_CHARS[currentIconType];
          if (icon === this.props.icon) {
            textInfo = `Its your(${icon}) turn`;
          } else {
            textInfo = `Its ${this.props.friend["friend"]}'s(${icon}) turn`;
            // lock game here
            for (let i = 1; i <= 9; i++) {
              $(`#cell-tttfriend-id-${i}`).prop("disabled", true);
            }
          }
        } else {
          let icon = ICON_CHARS[1 - currentIconType];
          if (icon === this.props.icon) {
            textInfo = `You Win!`;
          } else {
            textInfo = `${this.props.friend["friend"]} Wins!`;
          }
          if (icon === "X") this.props.updateScoreX();
          else this.props.updateScoreO();
        }
      }
    }
    if (this.state.loading) return <Loading height=" " />;
    return (
      <main className="main mx-auto">
        <h1 className="info">{textInfo}</h1>
        <Board sendMessage={this.sendMessage} />
      </main>
    );
  }
}

TicTacToeMainFriend.contextType = TTTFriendAppContext;

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
