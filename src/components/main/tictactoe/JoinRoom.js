import React, { Component } from "react";
import { connect } from "react-redux";

export class JoinRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: null,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Joining room ${this.state.code}`);
    this.props.history.push(`/waiting-room/${this.state.code}`);
  };

  render() {
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Enter code</label>
            <input
              type="number"
              name="code"
              id="code"
              className="form-control"
              onChange={(e) => this.setState({ code: e.target.value })}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Join game</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
