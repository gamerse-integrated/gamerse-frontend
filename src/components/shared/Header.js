import { auth } from "@config/firebaseConfig";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      new_password: "",
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validatePassword(this.state.new_password))
      this.setState({ loading: true }, () => {
        auth.currentUser
          .updatePassword(this.state.new_password)
          .then(() => {
            this.setState({ loading: false }, () =>
              NotificationManager.success("Password changed")
            );
          })
          .catch(({ message }) =>
            this.setState({ loading: false }, () =>
              NotificationManager.error(message)
            )
          );
      });
    else NotificationManager.error("Password not strong");
  };
  render() {
    if (this.state.loading) return "Processing";
    return (
      <header>
        <div className="navbar navbar-expand-lg navbar-light bg- shadow- mb-3">
          <div
            onClick={() => this.props.history.push("/")}
            className="navbar-brand"
            role="button"
          >
            <h1 className={`text-${this.props.color || ""}`}>Gamerse</h1>
          </div>

          <div className="ml-auto dropdown nav-item">
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
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
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
                <div className="form-group">
                  <div className="form-group">
                    {/* <label for="new_password">Change password</label> */}
                    <input
                      type="password"
                      className="form-control"
                      name="new_password"
                      id="new_password"
                      aria-describedby="newPasswordGuide"
                      placeholder="Enter new password"
                      onChange={(e) =>
                        this.setState({ new_password: e.target.value })
                      }
                    />
                    <small
                      id="newPasswordGuide"
                      className="form-text text-muted"
                    >
                      Password should be of length 6-20 and should contain one
                      capital and one numeric character and any symbol
                    </small>
                  </div>
                </div>
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
          </form>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
