import React, { Component } from "react";
import AppProvider from "./AppProvider";
import Main from "./Main";
import { AppContext } from "./AppProvider";
import { GAME_TYPES } from "./common";
import Header from "@shared/Header";
import { Route } from "react-router-dom";
import $ from "jquery";
import "./TTTbg.scss";
import AgainstHumanScoreBoard from "./AgainstHumanScoreBoard";

// import BG from "./grass4.png";

export default class TTThuman extends Component {
  componentDidMount() {
    $("#SetGameTypeHuman").click();
  }
  render() {
    return (
      <AppProvider>
        <div
          id="ttthuman"
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
                  id="SetGameTypeHuman"
                  className="btn btn-primary"
                  style={{
                    position: "fixed",
                    right: "2rem",
                    top: "48vh",
                  }}
                  onClick={() => {
                    context.changeType(GAME_TYPES.TWO_PLAYERS);
                    context.newGameHuman();
                  }}
                >
                  New Game
                </button>
              )}
            </AppContext.Consumer>
            <AgainstHumanScoreBoard />
          </div>
        </div>
      </AppProvider>
    );
  }
}

TTThuman.contextType = AppContext;
