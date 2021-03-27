import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "@config/firebaseConfig";

export default class TicTacToeRouter extends Component {
  render() {
    return (
      <div>
        <div className="d-flex flex-column min-vh-100">
          <header>
            <div className="navbar navbar-light bg-light border-bottom">
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
            </div>
          </header>
          <div className="d-flex flex-row flex-grow-1">
            <Link
              to="ttteasy"
              className="d-flex flex-column flex-grow-1 border col-3"
            >
              <p>Easy</p>
            </Link>
            <Link
              to="tttai"
              className="d-flex flex-column flex-grow-1 border col-3"
            >
              <p>Impossible (against AI)</p>
            </Link>
            <Link
              to="ttthuman"
              className="d-flex flex-column flex-grow-1 border col-3"
            >
              <p>Against Random Player</p>
            </Link>
            <Link
              to="tttfriend"
              className="d-flex flex-column flex-grow-1 border col-3"
            >
              <p>Against Friend</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
