import React, { Component } from "react";
import { connect } from "react-redux";

export class Loading extends Component {
  render() {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
