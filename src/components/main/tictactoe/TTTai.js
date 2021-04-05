import React, { Component } from "react";
import AppProvider from "./AppProvider";
import Main from "./Main";
import { AppContext } from "./AppProvider";
import { GAME_TYPES } from "./common";
import Header from "@shared/Header";
import { Route } from "react-router-dom";
// import $ from "jquery";
import "./TTTbg.scss";
import BackgroundImage from "@assets/6.webp";
import AgainstHumanScoreBoard from "./AgainstHumanScoreBoard";
// import BG from "./grass4.png";

export default class TTTai extends Component {
  componentWillUnmount() {
    this.props.resetScore();
  }
  render() {
    return (
      <AppProvider>
        <div
          id="tttai"
          className="min-vh-100 d-flex flex-column"
          // style={{ background: "black" }}
        >
          <Route
            component={(props) => <Header color="white" {...props}></Header>}
          ></Route>
          <div className="d-flex flex-row mx-auto flex-grow-">
            <div
              className="w-100"
              style={{
                // filter: "blur(4px)",
                boxShadow: "0 0 100rem 1rem black inset",
                position: `absolute`,
                height: `100vh`,
                zIndex: -1,
                top: 0,
                left: 0,
                background: `url(${BackgroundImage})`,
                backgroundPosition: `center`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `cover`,
                backgroundColor: `#fff`,
              }}
            />
            <AgainstHumanScoreBoard against="computer" />
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
