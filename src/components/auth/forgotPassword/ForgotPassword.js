import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import voca from "voca";
import BackgroundImage from "@assets/3.webp";
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
            background: `url(${BackgroundImage})`,
            backgroundPosition: `center`,
            backgroundSize: `cover`,
            backgroundColor: `#000000ff`,
          }}
        />

        {/* Form */}
        <form
          className="col-xl-5 col-12 d-flex flex-column p-xl-5 justify-content-center"
          autoComplete="off"
          onSubmit={submit}
          style={{
            borderRadius: "2rem",
            backdropFilter: `blur(10px)`,
            background: `rgba(255,255,255,.7)`,
          }}
        >
          {/* Title */}
          <h1
            className="p-4 text-center"
            // style={{ fontSize: "3rem" }}
          >
            Gamerse
          </h1>

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
