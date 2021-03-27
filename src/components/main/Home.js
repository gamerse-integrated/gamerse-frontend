import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "@config/firebaseConfig";
import GlobalChat from "./GlobalChat";
import "./Home.scss";
import php from "@config/php";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
    };
  }

  componentDidMount() {
    php
      .get("player.php", {
        params: {
          email: auth.currentUser.email,
        },
      })
      .then(({ data }) => this.setState({ userName: data["userName"] }));
    // setInterval(() => {
    //   php.post("player.php", {
    //     email: auth.currentUser.email,
    //   });
    // }, 1000 * 15);

    // if listener finds any change ==> prompt user
    // chat prompts
  }
  render() {
    return (
      <div>
        <div className="min-vh-100 d-flex animate__fadeIn animate__animated">
          <div className="col-8" id="home-controls">
            {/* dashboard nav */}
            <div className="col" id="dashboard-nav">
              <div id="logo">
                <h1 style={{ fontFamily: "" }}>Gamerse</h1>
              </div>
              <div className="dropdown">
                <img
                  // src="https://via.placeholder.com/150"
                  src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                  alt="Profile"
                  className="img-responsive rounded-circle shadow"
                  style={{
                    width: "3.2em",
                    height: "3.2em",
                  }}
                  role="button"
                  data-toggle="dropdown"
                />
                <div className="dropdown-menu dropdown-menu-right border-0 shadow p-1 mt-2 text-cente">
                  <div className="dropdown-item rounded" role="button">
                    {this.state.userName}
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item rounded" role="button">
                    Profile
                  </div>
                  <div
                    className="dropdown-item rounded"
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

            {/* game carousel */}
            <div className="col" id="dashboard-game-carousel">
              <div
                id="carouselExampleControls"
                className="carousel slide shadow"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <NavLink className="carousel-item active" exact to="/snakes">
                    <img
                      src="https://images.squarespace-cdn.com/content/v1/581c7ae0e4fcb5a092598bd2/1485967068457-LOS1A900WO03UR49RJLS/ke17ZwdGBToddI8pDm48kATcZhPPgYcFuBbLRWXKSW17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UfqrEwKkDN7t02uuax3QTm8xFzg0DvIyr4Q490sXg056vmShHcaEiFRh7O_DJxq26g/snake-pass-key-art-no-logo.jpg?format=2500w"
                      className="w-100 img-responsive"
                      alt="Snakes"
                      style={{
                        height: "60vh",
                      }}
                    />
                  </NavLink>
                  <NavLink className="carousel-item" exact to="/tictactoe">
                    <img
                      src="data:image/jpeg;base64,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"
                      className="w-100 img-responsive"
                      alt="Tic Tac Toe"
                      style={{
                        height: "60vh",
                      }}
                    />
                  </NavLink>
                  {/* <div className="carousel-item">
                    <img
                      src="https://via.placeholder.com/1200x720"
                      className="w-100 img-responsive"
                      alt="Game 3"
                      style={{
                        height: "60vh",
                      }}
                    />
                  </div> */}
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
              {/* <img
                src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_settings_48px-512.png"
                alt="Placeholder"
                className="img-responsive rounded-circle shadow"
                style={{
                  width: "4em",
                  height: "4em",
                }}
              /> */}
              <NavLink className="d-block" exact to="/friends">
                <img
                  src="https://www.ifsw.org/wp-content/uploads/2018/03/friends.png"
                  alt="Placeholder"
                  className="img-responsive rounded- shadow-"
                  style={{
                    width: "4em",
                    height: "4em",
                  }}
                />
              </NavLink>
              <NavLink className="d-block" to="/explore" exact>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_explore_48px-512.png"
                  alt="Placeholder"
                  className="img-responsive rounded- shadow-"
                  style={{
                    width: "4em",
                    height: "4em",
                  }}
                />
              </NavLink>
            </div>
          </div>
          <div className="col-4" id="global-chat">
            <GlobalChat userName={this.state.userName}></GlobalChat>
          </div>
        </div>
      </div>
    );
  }
}
