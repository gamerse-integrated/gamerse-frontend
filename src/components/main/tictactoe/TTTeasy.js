import BackgroundImage from "@assets/5.jpg";
import { auth } from "@config/firebaseConfig";
import Header from "@shared/Header";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import TicTacToe from "./TicTacToe";

// import BG from "./grass4.png";

export default class TTTeasy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerScore: 0,
      computerScore: 0,
    };
  }
  updateScore = (playerScore, computerScore) => {
    this.setState({ playerScore: playerScore, computerScore: computerScore });
  };
  resetGame = () => {
    this.refs.tttRef.resetGame();
  };
  render() {
    return (
      <div id="ttteasy" className="min-vh-100 d-flex flex-column">
        <Route
          component={(props) => <Header color="" {...props}></Header>}
        ></Route>
        <div
          className="w-100"
          style={{
            // filter: "blur(4px)",
            boxShadow: "0 0 100rem 1rem white inset",
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
        <div className="d-flex flex-row flex-grow-1">
          <div className="col-7 d-flex justify-content-center align-items-center">
            <div
              id="ttt"
              className="shadow p-5 bg-"
              style={{
                borderRadius: "1.2rem",
                backgroundColor: "#ffffffaa",
                backdropFilter: "blur(10px)",
              }}
            >
              <TicTacToe
                ref="tttRef"
                updateScore={this.updateScore}
              ></TicTacToe>
            </div>
          </div>
          <div className="col-5 d-flex justify-content-around align-items-center flex-column">
            <div
              className="d-flex justify-content-between align-items-center  shadow px-4 pt-4 text-black"
              style={{
                borderRadius: "1.4rem",
                width: "80%",
                backgroundColor: "#ffffffaa",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="d-flex flex-column justify-content-between">
                <img
                  src={auth.currentUser.photoURL}
                  alt="You"
                  className="img-responsive d-block rounded-circle shadow"
                  style={{
                    width: "6rem",
                    height: "6rem",
                  }}
                />
                <p
                  className="text-center pt-4"
                  style={{
                    fontSize: "5rem",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.playerScore}
                </p>
              </div>
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a3f544f1-f07b-4aa9-b6f9-824148c31a10/daqrpoq-f7ee01ed-ac8e-4c47-86c9-360f670365d2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTNmNTQ0ZjEtZjA3Yi00YWE5LWI2ZjktODI0MTQ4YzMxYTEwXC9kYXFycG9xLWY3ZWUwMWVkLWFjOGUtNGM0Ny04NmM5LTM2MGY2NzAzNjVkMi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.37GhMgHrxdiLQPB8OPtK_04vGDSUum7EM4vxWzmkzYY"
                alt="VS"
                className="img-responsive"
                style={{ width: "4rem", height: "4rem" }}
              ></img>
              <div className="d-flex flex-column justify-content-between">
                <img
                  src="https://api.multiavatar.com/41ae3276318cb34b82.svg"
                  alt="Computer"
                  className="img-responsive d-block rounded-circle shadow"
                  style={{
                    width: "6rem",
                    height: "6rem",
                  }}
                />
                <p
                  className="text-center pt-4"
                  style={{
                    fontSize: "5rem",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.computerScore}
                </p>
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.resetGame();
                }}
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
