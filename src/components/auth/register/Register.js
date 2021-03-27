import React, { Component } from "react";
import { auth, db } from "@config/firebaseConfig";
import RegisterSvg from "./Register.svg";
import { Link } from "react-router-dom";
import $ from "jquery";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
    };
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
        if (this.validatePassword(ev.target.value)) {
          $("#password").addClass("is-valid");
          $("#password").removeClass("is-invalid");
          $("#password_error").fadeOut();
        } else {
          $("#password").removeClass("is-valid");
          $("#password").addClass("is-invalid");
          $("#password_error").fadeIn();
        }
      }
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.validatePassword(this.state.password)) {
      if (this.state.confirm_password === this.state.password) {
        $("#reason").fadeOut("fast");
        auth
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(({ user }) => {
            user
              .sendEmailVerification()
              .then(() => {
                // create firestore doc
                db.collection("users").doc(user.uid).set({
                  hasData: false,
                });
                this.setState({ code: "accountCreated" }, () => {
                  $("#reason").fadeIn("fast");
                });
              })
              .catch((err) => {
                this.setState({ code: "sendMailError" }, () => {
                  $("#reason").fadeIn("fast");
                });
              });
          })
          .catch(({ code }) => {
            this.setState({ code: code }, () => {
              $("#reason").fadeIn("fast");
            });
          });
      }
    } else {
    }
  };

  render() {
    return (
      <div className="min-vh-100 d-flex flex-row-reverse">
        {/* Image */}
        <div className="d-flex align-items-center justify-content-center col-6 ">
          <img
            src={RegisterSvg}
            alt="Register"
            className="w-100 img-responsive p-5"
          />
        </div>

        {/* Form */}
        <div className="d-flex flex-column w-100 justify-content-center col-6 p-5">
          <form
            method="post"
            onSubmit={this.handleSubmit}
            autoComplete="off"
            className="w-75 mx-auto"
          >
            {/* Title */}
            <h1 className="text-center pb-4">Gamerse</h1>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={this.handleChange}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your E-mail"
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
                placeholder="Enter your Password"
              />
              <small
                id="password_error"
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
                disabled={this.state.password === "" ? true : false}
                type="password"
                name="confirm_password"
                id="comfirm_password"
                className="form-control"
                placeholder="Re-enter your Password"
                aria-describedby="passwordHelpText"
              />

              {this.state.confirm_password === this.state.password &&
              this.state.password !== "" ? (
                <small className="form-text text-success">
                  Password matched
                </small>
              ) : this.state.confirm_password !== "" ? (
                <small className="form-text text-danger">
                  Passwords do not match
                </small>
              ) : (
                ""
              )}
            </div>

            {/* Messages */}
            <div className="form-group" id="reason">
              {this.alertRegister()}
            </div>
            <div className="form-group d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary my-2">
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

  alertRegister() {
    if (this.state.code === "auth/email-already-in-use")
      return (
        <div className="alert alert-warning shadow d-flex justify-content-between align-items-center">
          <small>User already exists</small>
          <Link to="/login">Login</Link>
        </div>
      );
    else if (this.state.code === "auth/weak-password")
      return (
        <div className="alert alert-warning shadow d-flex justify-content-between align-items-center">
          <small>Please enter a stronger password</small>
        </div>
      );
    else if (this.state.code === "auth/invalid-email")
      return (
        <div className="alert alert-warning shadow d-flex justify-content-between align-items-center">
          <small>Invalid email</small>
        </div>
      );
    else if (this.state.code === "accountCreated")
      return (
        <div className="alert alert-success shadow d-flex justify-content-between align-items-center">
          <small>Account created. Verify email to continue</small>
        </div>
      );
    else if (this.state.code === "sendMailError")
      return (
        <div className="alert alert-danger shadow d-flex justify-content-between align-items-center">
          <small>Error sending verification mail</small>
        </div>
      );
  }
}
export default Register;
