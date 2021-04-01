import { auth } from "@config/firebaseConfig";
import React, { Component } from "react";
import { connect } from "react-redux";

export class Header extends Component {
  render() {
    return (
      <header>
        <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-3">
          <div
            onClick={() => this.props.history.push("/")}
            className="navbar-brand"
            role="button"
          >
            <h1>Gamerse</h1>
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
          className="modal fade"
          id="changePassword"
          tabindex="-1"
          role="dialog"
          aria-labelledby="changePasswordLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ borderRadius: "2rem" }}>
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
                <p>Form here</p>
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
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
