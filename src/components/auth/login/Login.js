import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import voca from "voca";
import LoginImage from "@assets/1.png";
import { auth } from "@config/firebaseConfig";
import Loading from "@components/shared/Loading";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
    this.setState({ loading: true }, () => {
      NotificationManager.info("Checking credentials");
      auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((u) => {
          if (u && !u.user.emailVerified) {
            NotificationManager.warning(
              "Verify account to proceed. Click this notification to resend the verification mail.",
              "Account verification",
              1000,
              async () => {
                try {
                  await u.user.sendEmailVerification();
                  NotificationManager.info(
                    "Verification mail sent",
                    null,
                    1000,
                    () => {},
                    true
                  );
                } catch ({ message }) {
                  NotificationManager.info(
                    message,
                    "Oops!",
                    1000,
                    () => {},
                    true
                  );
                }
              },
              true
            );
            auth.signOut();
          }
        })
        .catch((e) => {
          NotificationManager.error(e.message);
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div>
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
          {/* Image */}
          <div
            className="w-100"
            style={{
              position: `absolute`,
              height: `100vh`,
              zIndex: 0,
              top: 0,
              left: 0,
              background: `url(${LoginImage})`,
              backgroundPosition: `center`,
              backgroundSize: `cover`,
              backgroundColor: `#000000ff`,
            }}
          />

          {/* Login Form */}
          <div
            className="d-flex flex-column justify-content-center p-1 border-0 shadow"
            style={{
              zIndex: 1,
              backdropFilter: `blur(10px)`,
              background: `rgba(255,255,255,.7)`,
              borderRadius: `1rem`,
              width: `50vw`,
              minHeight: `60vh`,
              // overflow: "hidden",
            }}
          >
            <form
              method="post"
              onSubmit={this.handleSubmit}
              autoComplete="off"
              className="mx-auto"
              style={{
                width: "80%",
              }}
            >
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
