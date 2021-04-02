import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { auth } from "@config/firebaseConfig";
import Header from "@shared/Header";
// import React, { Component } from "react";
// import { connect } from "react-redux";
import friends from "./friends.svg";
import { Route } from "react-router-dom";
import { JoinRoom } from "./tictactoe/JoinRoom";
export default class TicTacToeRouter extends Component {
  render() {
    return (
      <div>
        <div className="d-flex flex-column min-vh-100">
          <header>
            {/* <div className="navbar navbar-light bg-light border-bottom">
              <div className="navbar-brand">
                <h1>Gamerse</h1>
              </div>
              <div className="dropdown">
                <img
                  // src="https://via.placeholder.com/150"
                  src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                  alt="Profile"
                  className="img-responsive rounded-circle shadow"
                  style={{
                    width: "3.6em",
                    height: "3.6em",
                  }}
                  role="button"
                  data-toggle="dropdown"
                />
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-item">Profile</div>
                  <div className="dropdown-item" onClick={() => auth.signOut()}>
                    Logout
                  </div>
                </div>
              </div>
            </div> */}
            <Route component={(props) => <Header {...props}></Header>}></Route>
          </header>
          <div className="d-flex flex-row flex-grow-1 ">
            <div className="d-flex flex-column flex-grow-1 border col-3">
              <Link to="ttteasy">
                <p>Easy</p>
              </Link>
            </div>
            <div className="d-flex flex-column flex-grow-1 border col-3">
              <Link to="tttai">
                <p>Impossible (against AI)</p>
              </Link>
            </div>
            <div className="d-flex flex-column flex-grow-1 border col-3">
              <Link to="ttthuman">
                <p>Against Random Player</p>
              </Link>
            </div>
            <div className="d-flex flex-column flex-grow-1 border col-3 align-items-center">
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
