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
import { NotificationManager } from "react-notifications";

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
        // console.log(text);
        if (text.split(" ")[1] === "New") {
          // new game
          $(".hack").css("display", "none");
          this.context.newGameHuman();
        } else if (text.split(" ")[1] === "Reset") {
          this.props.resetScore();
        } else if (text.split(" ")[1] === "USER_LEFT") {
          NotificationManager.error("The user has left");
          this.props.history.replace("/tictactoe");
        } else {
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
    }
  };

  componentWillUnmount() {
    this.sendMessage("USER_LEFT");
  }

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
            $(".hack").css("display", "none");
          } else {
            textInfo = `Its ${this.props.friend["friend"]}'s(${icon}) turn`;
            // lock game here
            $(".hack").css("display", "flex");
          }
        } else {
          let icon = ICON_CHARS[1 - currentIconType];
          if (icon === this.props.icon) {
            textInfo = `You Win!`;
          } else {
            textInfo = `${this.props.friend["friend"]} Wins!`;
          }
          $(".hack").css("display", "flex");
          if (icon === "X") this.props.updateScoreX();
          else this.props.updateScoreO();
        }
      }
    }
    if (this.state.loading) return <Loading height=" " />;
    return (
      <div className="d-flex flex-column ">
        <main className="main mx-auto">
          <h1 className="info">{textInfo}</h1>
          <Board sendMessage={this.sendMessage} />
        </main>
        <div
          className="bg- hack"
          style={
            this.props.icon === "X"
              ? {
                  position: "absolute",
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  top: "13vh",
                  width: "70vh",
                  height: "72.56vh",
                }
              : {
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  top: "13vh",
                  width: "70vh",
                  height: "72.56vh",
                }
          }
        >
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        {this.props.type === "challenger" && (
          <TTTFriendAppContext.Consumer>
            {(context) => (
              <div
                className="bg-"
                style={{
                  position: "absolute",
                  top: "50vh",
                  left: "46vw",
                  width: "21.2vw",
                  zIndex: 2,
                }}
              >
                <button
                  id="SetGameTypeHuman"
                  className="btn btn-primary d-block w-100"
                  onClick={() => {
                    this.sendMessage("New");
                    context.newGameHuman();
                  }}
                >
                  New Game
                </button>
                <button
                  className="btn btn-primary mt-5 d-block w-100"
                  onClick={() => {
                    this.sendMessage("Reset");
                    this.props.resetScore();
                  }}
                >
                  Reset score
                </button>
              </div>
            )}
          </TTTFriendAppContext.Consumer>
        )}
      </div>
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
