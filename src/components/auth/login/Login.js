import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import voca from "voca";
import LoginSvg from "./Login.svg";
import { auth } from "@config/firebaseConfig";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (evt) => {
    evt.preventDefault();
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        if (u && !u.user.emailVerified) {
          NotificationManager.info("Verify account to proceed");
          auth.signOut();
        }
      })
      .catch((e) => {
        NotificationManager.error(e.message);
      });
  };

  render() {
    return (
      <div>
        <div className="min-vh-100 d-flex">
          {/* Image */}
          <div className="d-flex align-items-center justify-content-center col-7">
            <img
              src={LoginSvg}
              alt="Login"
              className="w-100 img-responsive p-5"
            />
          </div>

          {/* Login Form */}
          <div className="d-flex flex-column w-100 justify-content-center col-5 p-5">
            <form method="post" onSubmit={this.handleSubmit} autoComplete="off">
              {/* Title */}
              <h1 className="text-center pb-4">Gamerse</h1>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  autoFocus
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  // placeholder="Enter your E-mail"
                />
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  // placeholder="Enter your Password"
                />
              </div>

              {/* Action buttons */}
              <div className="form-group d-flex flex-row-reverse justify-content-between align-items-center">
                <div>
                  <button
                    disabled={
                      voca.isEmpty(this.state.email) ||
                      voca.isEmpty(this.state.password)
                    }
                    type="submit"
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-dark"
                    data-target="auth-login-dropdown"
                    data-toggle="dropdown"
                  >
                    Actions
                  </button>
                  <div className="dropdown-menu my-2" id="auth-login-dropdown">
                    <Link
                      to="/register"
                      className="text-decoration-none text-dark dropdown-item"
                    >
                      Register
                    </Link>
                    <Link
                      to="/forgot"
                      className="text-decoration-none text-dark dropdown-item"
                    >
                      Forgot Password
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
