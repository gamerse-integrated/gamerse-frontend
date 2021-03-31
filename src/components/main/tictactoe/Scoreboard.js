import React from "react";
import Score from "./Score";

const ScoreBoard = ({ player1, player2 }) => {
  return (
    <div className="score-board">
      <h1 className="score-title">Score Board</h1>
      <Score name={player1[0]} score={player1[1]} />
      <Score name={player2[0]} score={player2[1]} />
    </div>
  );
};
export default ScoreBoard;
