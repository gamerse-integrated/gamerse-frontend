import React from "react";

const Score = ({ name, score }) => {
  return (
    <div className="score-container">
      <span className="name">{name}</span>
      <span>:</span>
      <span className="score">{score}</span>
    </div>
  );
};
export default Score;
