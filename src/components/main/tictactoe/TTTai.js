import React, { Component } from "react";
import AppProvider from "./AppProvider";
import Main from "./Main";
import { AppContext } from "./AppProvider";
import { GAME_TYPES } from "./common";
import Header from "@shared/Header";
import { Route } from "react-router-dom";
// import $ from "jquery";
import "./TTTbg.scss";

// import BG from "./grass4.png";

export default class TTTai extends Component {
  render() {
    return (
      <AppProvider>
        <div
          id="tttai"
          className="min-vh-100 d-flex flex-column"
          style={{ background: "black" }}
        >
          <Route
            component={(props) => <Header color="white" {...props}></Header>}
          ></Route>
          <div className="d-flex flex-row mx-auto flex-grow-">
            <Main></Main>
            <AppContext.Consumer>
              {(context) => (
                <button
                  className="btn btn-primary"
                  style={{
                    position: "fixed",
                    right: "2rem",
                    top: "48vh",
                  }}
                  onClick={() => {
                    context.changeType(GAME_TYPES.VERSUS_COMPUTER);
                    context.newGame();
                  }}
                >
                  New Game
                </button>
              )}
            </AppContext.Consumer>
          </div>
        </div>
      </AppProvider>
    );
  }
}

TTTai.contextType = AppContext;
