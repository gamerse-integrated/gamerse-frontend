import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { auth } from "@config/firebaseConfig";
import Header from "@shared/Header";
// import React, { Component } from "react";
// import { connect } from "react-redux";
import friends from "./friends.svg";
import { Route } from "react-router-dom";
import { JoinRoom } from "./tictactoe/JoinRoom";
// import BackgroundImage from "@assets/Login.jpg";
export default class TicTacToeRouter extends Component {
  render() {
    return (
      <div>
        <div className="d-flex flex-column min-vh-100">
          {/* <div
            className="w-100"
            style={{
              position: `absolute`,
              height: `100vh`,
              zIndex: 0,
              top: 0,
              left: 0,
              background: `url(${BackgroundImage})`,
              backgroundPosition: `center`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `contain`,
              backgroundColor: `#fff`,
            }}
          /> */}

          <Route component={(props) => <Header {...props}></Header>}></Route>
          <div className="d-flex flex-row flex-grow-1 text-dark">
            <div className="d-flex flex-column flex-grow-1 text-center justify-content-around col-3">
              <Link className="stretched-link" to="ttteasy">
                <p>Easy</p>
              </Link>
            </div>
            <div className="d-flex flex-column flex-grow-1 text-center justify-content-around col-3">
              <Link className="stretched-link" to="tttai">
                <p>Impossible (against AI)</p>
              </Link>
            </div>
            <div className="d-flex flex-column flex-grow-1 text-center justify-content-around col-3">
              <Link className="stretched-link" to="ttthuman">
                <p>Against Random Player</p>
              </Link>
            </div>
            <div className="d-flex flex-column flex-grow-1 text-center justify-content-around col-3 align-items-center">
              <p>VS Friend</p>
              <img
                src={friends}
                className="w-100 img-responsive"
                alt="Snakes"
                style={
                  {
                    // height: "100%",
                  }
                }
              />
              <Route
                component={(props) => <JoinRoom {...props}></JoinRoom>}
              ></Route>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
