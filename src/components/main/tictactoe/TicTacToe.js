import React, { Component } from "react";
import ScoreBoard from "./Scoreboard";
import "./TicTacToe.css";

class TicTacToe extends Component {
  constructor() {
    super();
    this.state = {
      winner: undefined,
      winnerLine: "",
    };
    this.gameState = {
      turn: "X",
      gameLocked: false,
      gameEnded: false,
      board: Array(9).fill(""),
      totalMoves: 0,
      currentPlayerScore: 0,
      opponentPlayer: 0,
    };
  }

  clicked = (box) => {
    if (this.gameState.gameEnded || this.gameState.gameLocked) return;

    if (this.gameState.board[box.dataset.square] == "") {
      this.gameState.board[box.dataset.square] = this.gameState.turn;
      box.innerText = this.gameState.turn;

      this.gameState.turn = this.gameState.turn == "X" ? "O" : "X";

      this.gameState.totalMoves++;
    }

    console.log(this.gameState.totalMoves);

    var result = this.checkWinner();

    if (result == "X") {
      this.gameState.gameEnded = true;
      this.gameState.currentPlayerScore = this.gameState.currentPlayerScore + 1;
      this.setState({
        winner: "X",
        winnerLine: "Match won by X",
      });
    } else if (result == "O") {
      this.gameState.gameEnded = true;
      this.gameState.opponentPlayer = this.gameState.opponentPlayer + 1;
      this.setState({
        winner: "O",
        winnerLine: "Match won by O",
      });
    } else if (result == "draw") {
      this.gameState.gameEnded = true;
      this.setState({
        winner: "draw",
        winnerLine: "Match is drawn",
      });
    }

    if (this.gameState.turn == "O" && !this.gameState.gameEnded) {
      this.gameState.gameLocked = true;
      setTimeout(() => {
        do {
          var random = Math.floor(Math.random() * 9);
        } while (this.gameState.board[random] != "");
        this.gameState.gameLocked = false;
        this.clicked(document.querySelectorAll(".square")[random]);
      }, 500);
    }
  };

  checkWinner = () => {
    var moves = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    var board = this.gameState.board;
    for (let i = 0; i < moves.length; i++) {
      if (
        board[moves[i][0]] == board[moves[i][1]] &&
        board[moves[i][1]] == board[moves[i][2]]
      )
        return board[moves[i][0]];
    }

    console.log(this.gameState.totalMoves);
    if (this.gameState.totalMoves == 9) {
      return "draw";
    }
  };

  render() {
    return (
      <div id="game">
        <div id="status">{this.state.winnerLine}</div>
        {/* <div id="head">Tic Tac Toe AI Easy</div> */}
        <div id="board" onClick={(e) => this.clicked(e.target)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
        <ScoreBoard
          player1={["X", this.gameState.currentPlayerScore]}
          player2={["O", this.gameState.opponentPlayer]}
        />
      </div>
    );
  }
}

export default TicTacToe;
