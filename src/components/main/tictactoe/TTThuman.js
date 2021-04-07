import BackgroundImage from "@assets/ttthuman.webp";
import { resetScore } from "@redux/actionCreators/tictactoe";
import Header from "@shared/Header";
import $ from "jquery";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import AgainstHumanScoreBoard from "./AgainstHumanScoreBoard";
import AppProvider, { AppContext } from "./AppProvider";
import { GAME_TYPES } from "./common";
import Main from "./Main";
// import BG from "./grass4.png";

export class TTThuman extends Component {
  componentDidMount() {
    $("#SetGameTypeHuman").click();
  }
  componentWillUnmount() {
    this.props.resetScore();
  }
  render() {
    return (
      <AppProvider>
        <div id="ttthuman" className="min-vh-100 d-flex flex-column">
          <Route
            component={(props) => <Header color="white" {...props}></Header>}
          ></Route>
          <div className="d-flex bg- container-fluid flex-row flex-grow-1">
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
            <div className="d-flex align-items-center ml-5">
              <AgainstHumanScoreBoard />
            </div>
            <div className="mx-auto">
              <Main></Main>
            </div>
            <AppContext.Consumer>
              {(context) => (
                <>
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
                  <button
                    className="btn btn-primary mt-5"
                    style={{
                      position: "fixed",
                      right: "2rem",
                      top: "52vh",
                    }}
                    onClick={this.props.resetScore}
                  >
                    Reset score
                  </button>
                </>
              )}
            </AppContext.Consumer>
          </div>
        </div>
      </AppProvider>
    );
  }
}

TTThuman.contextType = AppContext;
const mapStateToProps = ({ tictactoe }) => ({});

const mapDispatchToProps = {
  resetScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(TTThuman);
