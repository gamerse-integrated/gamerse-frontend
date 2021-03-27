import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import voca from "voca";
import ForgotSvg from "./Forgot.svg";
import { auth, rcv } from "@config/firebaseConfig";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = (ev) => {
    ev.preventDefault();
    window.removeCaptcha = () => window.rcv.clear();
    window.rcv = new rcv("captcha", {
      callback: (res) => {
        auth
          .sendPasswordResetEmail(email)
          .then(() => {
            NotificationManager.success("Password reset email sent");
          })
          .finally(() => window.removeCaptcha());
      },
    });
    window.rcv.render();
  };

  return (
    <div>
      <div className="min-vh-100 d-flex">
        {/* Image */}
        <div className="d-xl-flex d-none col-xl-7 justify-content-center align-items-end">
          <img
            src={ForgotSvg}
            alt="Forgot password"
            className="img-responsive w-100 px-5"
          />
        </div>

        {/* Form */}
        <form
          className="col-xl-5 col-12 d-flex flex-column p-xl-5 justify-content-center"
          autoComplete="off"
          onSubmit={submit}
        >
          {/* Title */}
          <div
            className="h1 p-4 text-center"
            // style={{ fontSize: "3rem" }}
          >
            Gamerse
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              autoFocus
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>

          {/* Captcha */}
          <div
            className="form-group d-flex justify-content-center"
            id="captcha"
          ></div>

          {/* Action buttons */}
          <div className="form-group d-flex flex-row-reverse justify-content-between align-items-center">
            <button className="btn btn-primary" disabled={voca.isEmpty(email)}>
              Send
            </button>

            <Link to="/login">
              <button type="submit" className="btn btn-t-light">
                <span className="fa fa-chevron-left fa-fw"></span> Back to Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
