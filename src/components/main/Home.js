import React, { Component } from "react";
import { auth } from "@config/firebaseConfig";
import GlobalChat from "./GlobalChat";
import "./Home.scss";
import SnakesImage from "./snakes.jpg";
// import $ from "jquery";
import BackgroundImage from "@assets/3.webp";
import { Route } from "react-router";
import Header from "@components/shared/Header";

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
          className="w-100"
          style={{
            position: `absolute`,
            height: `100vh`,
            zIndex: 0,
            top: 0,
            left: 0,
            background: `url(${BackgroundImage})`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#000000ff`,
          }}
        />
        <div
          className="col-md-8 col-12 d-flex flex-column min-vh-100 px-md-5 py-md-3"
          id="home-controls"
        >
          {/* dashboard nav */}
          <Route
            component={(props) => <Header {...props} color="white"></Header>}
          ></Route>

          {/* game carousel */}
          <div className="col p-0" id="dashboard-game-carousel">
            <div
              id="carouselExampleControls"
              className="carousel slide shadow"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div
                  className="carousel-item"
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
                  className="carousel-item active text-center bg-white"
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
                  filter: "invert(1)",
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
                  filter: "invert(1)",
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
        <div
          className="col-md-4 d-md-block d-none"
          id="global-chat"
          style={{
            zIndex: 1,
            backdropFilter: `blur(10px)`,
            background: `rgba(255,255,255,.8)`,
            borderRadius: `1rem 0 0 1rem`,
          }}
        >
          <GlobalChat userName={this.props.userName}></GlobalChat>
        </div>
      </div>
    );
  }
}
