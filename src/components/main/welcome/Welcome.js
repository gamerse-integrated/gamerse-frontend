import $ from "jquery";
import React, { Component } from "react";
import WelcomeSvg from "./Welcome.svg";
import php from "@config/php";
import { auth, db } from "@config/firebaseConfig";
import { NotificationManager } from "react-notifications";

export default class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountStatus: "active",
      userName: "",
      nickName: "",
      gender: "Male",
      dob: "",
      err: "",
      unameError: null,
    };
  }
  calculate_age = (date) => {
    var today = new Date();
    var birthDate = new Date(date);
    console.log("get bod-->", birthDate);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log("my age", age_now);
    return age_now;
  };
  onDateChange = (ev) => {
    console.log(ev.target.value);
    this.setState({ dob: ev.target.value }, () => {
      if (this.calculate_age(ev.target.value) <= 11) {
        this.setState({ err: "You must be atleast 11 years of old to join." });
      } else {
        this.setState({ err: "" });
      }
    });
  };

  validateUsername = (uname) => {
    return uname.match("^[a-zA-Z ]*$");
  };
  checkUserExists = (userName) => {
    php
      .get("player.php", {
        params: {
          userName: userName,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.userName === userName) {
          this.setState({ ...this.state, unameError: "User already exists !" });
        } else {
          this.setState({
            ...this.state,
            unameError: null,
          });
        }
      });
  };

  handleChange = (ev) => {
    this.setState({ ...this.state, unameError: null });
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value }, () => {
      if (ev.target.name === "userName") {
        if (this.validateUsername(ev.target.value)) {
          this.checkUserExists(ev.target.value);
        } else {
          this.setState({
            ...this.state,
            unameError: "Username can only be text !",
          });
        }
      }
    });
  };

  componentDidMount() {
    var now = new Date(),
      maxDate = now.toISOString().substring(0, 10);

    $(".dob").prop("max", maxDate);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    php
      .post("player.php", {
        UID: auth.currentUser.uid,
        userName: this.state.userName,
        nickName: this.state.nickName,
        mail: auth.currentUser.email,
        dob: this.state.dob,
        gender: this.state.gender,
        accountStatus: this.state.accountStatus,
        photoURL: auth.currentUser.photoURL,
      })
      .then((res) => {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .update({
            hasData: true,
          })
          .then(() => {
            this.props.history.replace("/");
          })
          .catch(({ message }) => {
            NotificationManager.error(message);
          });
      });
  };
  render() {
    return (
      <div
        className="d-flex flex-column align-items-center w-100  justify-content-center min-vh-100 animate__fadeIn animate__animated"
        style={{
          background: `linear-gradient( rgba(255, 255, 255, 74%), rgba(0, 0, 0, 10%) ), url(${WelcomeSvg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div
          className="d-flex flex-column w-100 justify-content-center col-5 p-5 border rounded animate__animated animate__bounceIn"
          style={{
            backgroundColor: `rgba(255,255,255,56%)`,
          }}
        >
          <form method="post" onSubmit={this.handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="uname">User Name</label>
              <input
                type="text"
                className="form-control "
                id="uname"
                placeholder="Enter Username"
                name="userName"
                onChange={this.handleChange}
                required
              />

              <small id="username_error" className="text-danger form-text">
                {this.state.unameError}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="nname">Nick Name</label>
              <input
                type="text"
                className="form-control"
                id="nname"
                placeholder="Enter Nickname"
                name="nickName"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                className="gender form-control"
                onChange={this.handleChange}
                value={this.state.gender}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <br />
              <input
                type="date"
                name="dob"
                className="dob form-control"
                onChange={this.onDateChange}
                required
              />
            </div>

            <div className="d-flex flex-row justify-content-between">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                className="btn btn-danger "
                onClick={() => auth.signOut()}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
