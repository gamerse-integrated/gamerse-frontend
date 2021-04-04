import React, { Component } from "react";
import { auth } from "@config/firebaseConfig";
import GlobalChat from "./GlobalChat";
import "./Home.scss";
import SnakesImage from "./snakes.jpg";
import $ from "jquery";

// import multiavatar from "@multiavatar/multiavatar/esm";

export default class Home extends Component {
  // componentDidMount() {
  //   $(function () {
  //     $('[data-toggle="tooltip"]').tooltip();
  //   });
  // }
  // componentWillUnmount() {
  //   $(function () {
  //     $('[data-toggle="tooltip"]').tooltip("hide");
  //   });
  // }
  render() {
    return (
      <div className="min-vh-100 d-flex">
        <div
          className="col-md-8 col-12 d-flex flex-column min-vh-100 px-md-5 py-md-3"
          id="home-controls"
        >
          {/* dashboard nav */}
          <div className="nav" id="dashboard-nav">
            <div id="logo">
              <h1 style={{ fontFamily: "serif" }}>Gamerse</h1>
            </div>
            <div className="dropdown">
              <img
                src={auth.currentUser.photoURL}
                alt="Profile"
                className="img-responsive rounded-circle shadow"
                style={{
                  width: "3.2em",
                  height: "3.2em",
                }}
                role="button"
                data-toggle="dropdown"
              />
              <div className="dropdown-menu dropdown-menu-right border-0 shadow p-0 mt-2 text-cente overflow-hidden">
                <div
                  className="dropdown-item"
                  role="button"
                  data-toggle="modal"
                  data-target="#changePassword"
                  data-backdrop="false"
                >
                  Change password
                </div>

                <div
                  className="dropdown-item"
                  role="button"
                  onClick={() =>
                    auth.signOut().then((e) => global.worker.terminate())
                  }
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal"
            id="changePassword"
            tabindex="-1"
            role="dialog"
            aria-labelledby="changePasswordLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div
                className="modal-content border-0 shadow animate__animated animate__fadeIn"
                style={{
                  borderRadius: "2rem",
                  backdropFilter: `blur(10px)`,
                  background: `rgba(255,255,255,.7)`,
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title" id="changePasswordLabel">
                    Change password
                  </h5>
                  <button
                    type="button"
                    className="close d-none"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Form here</p>
                </div>
                <div className="modal-footer justify-content-around">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* game carousel */}
          <div className="col p-0" id="dashboard-game-carousel">
            <div
              id="carouselExampleControls"
              className="carousel slide shadow"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div
                  className="carousel-item active"
                  onClick={() => this.props.history.push("/snakes")}
                  role="button"
                >
                  <img
                    src={SnakesImage}
                    className="w-100 img-responsive"
                    alt="Snakes"
                    style={{
                      height: "100%",
                    }}
                  />
                </div>
                <div
                  className="carousel-item text-center"
                  onClick={() => this.props.history.push("/tictactoe")}
                  role="button"
                >
                  <img
                    src={
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/1200px-Tic_tac_toe.svg.png"
                    }
                    className="img-responsive"
                    alt="Tic Tac Toe"
                    style={{
                      height: "100%",
                    }}
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          {/* dashboard */}
          <div
            className="col d-flex justify-content-around"
            id="dashboard-controls"
          >
            <span
              className="d-block"
              onClick={() => this.props.history.push("/friends")}
              role="button"
            >
              <img
                src={
                  "https://www.ifsw.org/wp-content/uploads/2018/03/friends.png"
                }
                alt="Placeholder"
                className="img-responsive rounded- shadow-"
                style={{
                  width: "4em",
                  height: "4em",
                }}
                // data-toggle="tooltip"
                // data-placement="top"
                // title="Friends"
              />
            </span>
            <span
              className="d-block"
              onClick={() => this.props.history.push("/explore")}
              role="button"
            >
              <img
                src={
                  "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_explore_48px-512.png"
                }
                alt="Placeholder"
                className="img-responsive rounded- shadow-"
                style={{
                  width: "4em",
                  height: "4em",
                }}
                // data-toggle="tooltip"
                // data-placement="top"
                // title="Explore"
              />
            </span>
          </div>
        </div>
        <div className="col-md-4 d-md-block d-none" id="global-chat">
          <GlobalChat userName={this.props.userName}></GlobalChat>
        </div>
      </div>
    );
  }
}
