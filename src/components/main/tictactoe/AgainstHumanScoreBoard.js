import React, { Component } from "react";
import { connect } from "react-redux";

export class AgainstHumanScoreBoard extends Component {
  render() {
    return (
      <div
        className="text-dark d-flex flex-column align-items-center justify-content-center shadow"
        style={{
          position: "relative",
          // top: "30vh",
          // left: "3rem",
          borderRadius: `1rem`,
          width: `25vw`,
          height: `50vh`,
          backdropFilter: `blur(10px)`,
          background: `rgba(255,255,255,.7)`,
        }}
      >
        <div>
          <h1>
            <u>Score</u>
          </h1>
        </div>
        {this.props.against !== "computer" ? (
          <>
            <div>
              <h1 className="d-inline-block"> X:</h1>
              <span className="ml-5 lead" style={{ fontSize: "4rem" }}>
                {this.props.score_x}
              </span>
            </div>
            <div>
              <h1 className="d-inline-block"> O:</h1>
              <span className="ml-5 lead" style={{ fontSize: "4rem" }}>
                {this.props.score_o}
              </span>
            </div>
            <div>
              <h1 className="d-inline-block"> Tie:</h1>
              <span className="ml-5 lead" style={{ fontSize: "4rem" }}>
                {this.props.tie}
              </span>
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className="d-inline-block"> AI:</h1>
              <span className="ml-5 lead" style={{ fontSize: "4rem" }}>
                {this.props.score_x}
              </span>
            </div>
            <div>
              <h1 className="d-inline-block"> You:</h1>
              <span className="ml-5 lead" style={{ fontSize: "4rem" }}>
                {this.props.score_o}
              </span>
            </div>
            <div>
              <h1 className="d-inline-block"> Tie:</h1>
              <span className="ml-5 lead" style={{ fontSize: "4rem" }}>
                {this.props.tie}
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ tictactoe }) => ({
  score_x: tictactoe.score_x,
  score_o: tictactoe.score_o,
  tie: tictactoe.tie,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgainstHumanScoreBoard);
