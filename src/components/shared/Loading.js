import React, { Component } from "react";
import { connect } from "react-redux";
import "./Loading.scss";

export class Loading extends Component {
  render() {
    return (
      <div
        id="Loading"
        className={`d-flex ${
          this.props.height || "min-vh-100"
        } bg- justify-content-center align-items-center`}
      >
        <div className="loading">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
