import React, { Component } from "react";
import { AppContext } from "./AppProvider";
import { GAME_TYPES } from "./common";

// import "./Header.css";

const GameType = (props) => {
  const { value, name } = props;

  return (
    <AppContext.Consumer>
      {(context) => (
        <li
          onClick={() => context.changeType(value)}
          className={value === context.gameType ? "active" : ""}
        >
          {name}
        </li>
      )}
    </AppContext.Consumer>
  );
};

class Header extends Component {
  render() {
    return (
      <div className="d-block bg-white rounded shadow-lg mb-4 w-100 p-5">
        {/* <h1>Tic Tac Toe</h1> */}
        <ul className="list-group list-group-flush">
          <GameType
            className="list-group-item"
            value={GAME_TYPES.TWO_PLAYERS}
            name="2 Players"
          />
          <GameType
            className="list-group-item"
            value={GAME_TYPES.VERSUS_COMPUTER}
            name="Versus Computer"
          />
        </ul>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => this.context.newGame()}
          >
            New Game
          </button>
        </div>
      </div>
    );
  }
}

Header.contextType = AppContext;

export default Header;
