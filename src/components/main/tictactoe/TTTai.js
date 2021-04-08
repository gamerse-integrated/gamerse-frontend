// import $ from "jquery";
import BackgroundImage from "@assets/tttai.webp";
import { resetScore } from "@redux/actionCreators/tictactoe";
import Header from "@shared/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import AgainstHumanScoreBoard from "./AgainstHumanScoreBoard";
import AppProvider, { AppContext } from "./AppProvider";
import { GAME_TYPES } from "./common";
import Main from "./Main";
// import BG from "./grass4.png";

export class TTTai extends Component {
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
          <div className="d-flex bg- container-fluid flex-row flex-grow-1">
            <audio
              className="d-none"
              autoPlay
              src="https://d1o44v9snwqbit.cloudfront.net/musicfox_demo_MF-4006.mp3"
              loop
            ></audio>
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
                filter: "blur(2px)",
                transform: "scale(1.1)",
              }}
            />
            <div className="d-flex align-items-center ml-5">
              <AgainstHumanScoreBoard against="computer" />
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
                      context.changeType(GAME_TYPES.VERSUS_COMPUTER);
                      context.newGame();
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

TTTai.contextType = AppContext;
TTTai.contextType = AppContext;
const mapStateToProps = ({ tictactoe }) => ({});

const mapDispatchToProps = {
  resetScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(TTTai);
