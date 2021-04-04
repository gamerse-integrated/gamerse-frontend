import React, { Component } from "react";
import { auth, db } from "@config/firebaseConfig";
import RegisterImage from "@assets/Register.jpg";
import { Link } from "react-router-dom";
import $ from "jquery";
import { Loading } from "@components/shared/Loading";
import { NotificationManager } from "react-notifications";
import voca from "voca";
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email: "",
      password: "",
      confirm_password: "",
    };
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  validatePassword = (password) =>
    password.match(/[a-z]/g) &&
    password.match(/[A-Z]/g) &&
    password.match(/[0-9]/g) &&
    password.match(/[^a-zA-Z\d]/g) &&
    password.length >= 6 &&
    password.length <= 20;
  handleChange = (ev) => {
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value }, () => {
      if (ev.target.name === "password") {
        if (!voca.isEmpty(ev.target.value)) {
          if (this.validatePassword(ev.target.value)) {
            $("#password").addClass("is-valid");
            $("#password").removeClass("is-invalid");
            $("#password_help_text").fadeOut();
          } else {
            $("#password").removeClass("is-valid");
            $("#password").addClass("is-invalid");
            $("#confirm_password").removeClass("is-valid");
            $("#confirm_password").removeClass("is-invalid");
            $("#password_help_text").fadeIn();
          }
        } else {
          $("#password").removeClass("is-valid");
          $("#password").removeClass("is-invalid");
          $("#confirm_password").removeClass("is-valid");
          $("#confirm_password").removeClass("is-invalid");
          $("#password_help_text").fadeOut();
        }
      } else if (ev.target.name === "confirm_password") {
        if (this.validatePassword(this.state.password)) {
          if (this.state.password === this.state.confirm_password) {
            $("#confirm_password").addClass("is-valid");
            $("#confirm_password").removeClass("is-invalid");
          } else {
            $("#confirm_password").removeClass("is-valid");
            $("#confirm_password").addClass("is-invalid");
          }
        } else {
          $("#password").removeClass("is-valid");
          $("#password").addClass("is-invalid");
          $("#confirm_password").removeClass("is-valid");
          $("#confirm_password").removeClass("is-invalid");
          $("#password_help_text").fadeIn();
        }
      }
    });
  };
  genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (
      this.validatePassword(this.state.password) &&
      this.state.confirm_password === this.state.password
    ) {
      this.setState({ loading: true }, () => {
        let photoURL = `https://api.multiavatar.com/${this.genRanHex(18)}.svg`;
        auth
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(({ user }) => {
            user
              .sendEmailVerification()
              .then(() => {
                db.collection("users")
                  .doc(user.uid)
                  .set({
                    hasData: false,
                  })
                  .then(() => {
                    auth.currentUser
                      .updateProfile({
                        photoURL: photoURL,
                      })
                      .then(() => {
                        this.setState({ loading: false }, () => {
                          NotificationManager.success("Account created");
                        });
                      })
                      .catch(({ message }) => {
                        this.setState({ loading: false }, () => {
                          NotificationManager.error(
                            message.trim(),
                            "Unable to create account"
                          );
                        });
                      });
                  });
              })
              .catch(({ message }) => {
                this.setState({ loading: false }, () => {
                  NotificationManager.error(
                    message.trim(),
                    "Unable to create account"
                  );
                });
              });
          })
          .catch(({ message }) => {
            this.setState({ loading: false }, () => {
              NotificationManager.error(
                message.trim(),
                "Unable to create account"
              );
            });
          });
      });
    } else {
      NotificationManager.error("Please enter correct details");
    }
  };
  render() {
    if (this.state.loading) return <Loading />;
    return (
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
            background: `url(${RegisterImage})`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#000000ff`,
          }}
        />
        {/* Form */}
        <div
          className="d-flex flex-column justify-content-center p-3 shadow border-0"
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
            <h1 className="text-center p-4">Gamerse</h1>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={this.handleChange}
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
            </div>
            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <small
                id="password_help_text"
                className="text-danger form-text"
                style={{ display: "none" }}
              >
                Password should be of length 6-20 and should contain one capital
                and one numeric character and any symbol
              </small>
            </div>
            {/* Confirm password */}
            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                onChange={this.handleChange}
                disabled={
                  voca.isEmpty(this.state.password) ||
                  !this.validatePassword(this.state.password)
                }
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="form-control"
              />
            </div>
            <div className="form-group d-flex justify-content-between align-items-center">
              <button
                type="submit"
                disabled={
                  voca.isEmpty(this.state.email) ||
                  voca.isEmpty(this.state.password) ||
                  voca.isEmpty(this.state.confirm_password)
                }
                className="btn btn-primary my-2"
              >
                Register
              </button>
              <Link to="/login" className="form-text text-muted">
                Already a member?
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
