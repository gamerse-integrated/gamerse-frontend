import React, { Component } from "react";
import { auth } from "@config/firebaseConfig";
import SnakeGame from "./SnakeGame";
import SnakesScore from "./SnakesScore";

export class Snakes extends Component {
  render() {
    return (
      <div className="min-vh-100 game-container d-flex flex-column">
        <header>
          <div className="navbar navbar-light bg-white shadow">
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
        <div className="d-flex flex-grow-1">
          <div className="col-7 d-flex flex-column justify-content-center align-items-center">
            <SnakeGame />
          </div>
          <div className="col-5">
            <SnakesScore />
          </div>
        </div>
      </div>
    );
  }
}

export default Snakes;
