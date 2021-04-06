import Loading from "@components/shared/Loading";
import $ from "jquery";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";

export class InGameChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      messages: [],
      message: "",
    };
  }

  hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  intToRGB = (i) => {
    let c = (i & 0x00ffffff).toString(16).toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  };

  sendMessage = (message) => {
    if (message) {
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        300
      );
      this.props.pubnub
        .publish({
          channel: [`${this.props.friendId}_InGameChat`],
          message:
            "@" +
            this.props.userName +
            " / " +
            new Date().toISOString() +
            " / " +
            "message / " +
            message,
        })
        .then(() => {
          this.setState({ message: "" });
        });
    }
  };

  handleMessage = (event) => {
    // NotificationManager.error("message");
    if (event.channel === `${this.props.friendId}_InGameChat`) {
      // console.log(event);
      const message = event.message;
      if (typeof message === "string" || message.hasOwnProperty("text")) {
        const text = message.text || message;
        let messageParts = text.split(" / ");
        let content = Array.from(messageParts).splice(3).join(" / ");
        if (content === "USER_LEFT") {
          NotificationManager.error("The other user has left");
          this.props.history.replace("/tictactoe");
        } else {
          this.setState((prevState) => {
            return { messages: [...prevState.messages, text] };
          });
          $("#chatStyle").animate(
            { scrollTop: $("#chatStyle").prop("scrollHeight") },
            300
          );
        }
      }
    }
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log("cwrp", this.props);
  //   console.log("cwrp", nextProps);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("cdu", prevProps);
  //   console.log("cdu", this.props);
  //   if (prevProps.userName !== this.props.userName) {
  //     this.setState({ userName: this.props.userName, loading: false });
  //   }
  // }

  componentDidMount() {
    this.props.pubnub.addListener({ message: this.handleMessage });
    this.props.pubnub.subscribe({
      channels: [`${this.props.friendId}_InGameChat`],
    });
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    // this.sendMessage("USER_LEFT");
    this.props.pubnub.unsubscribe({
      channels: [`${this.props.friendId}_InGameChat`],
    });
  }

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div
        className="d-flex flex-column flex-grow-1 p-3 shadow"
        style={{
          borderRadius: `1rem`,
          backdropFilter: `blur(10px)`,
          background: `rgba(255,255,255,.7)`,
        }}
      >
        <div className="position-relative">
          <h3 className="text-dark font-weight-bold h1 text-center p-1 bg-">
            In-Game Chat
          </h3>
          <div
            style={{
              maxHeight: "65vh",
              overflowY: "auto",
            }}
            id="chatStyle"
            className=""
          >
            {this.state.messages.map((message, index) => {
              let messageParts = message.split(" / ");
              let sender = messageParts[0];
              let timestamp = new Date(messageParts[1]);
              let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              let printTime = `${
                days[timestamp.getDay()]
              }, ${timestamp.toLocaleString()}`;
              // let message_type = messageParts[2];
              let content = Array.from(messageParts).splice(3).join(" / ");
              return (
                <div
                  className="shadow-sm animate__animated animate__fadeIn"
                  key={`message-${sender}-${timestamp.getTime()}`}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "1rem",
                    color: "black",
                    fontSize: "1.1rem",
                    margin: "5px",
                    padding: "8px 15px",
                  }}
                >
                  <small
                    className="text- d-block"
                    style={{
                      color: `${this.intToRGB(this.hashCode(sender))}`,
                    }}
                  >
                    {sender}
                  </small>
                  <span style={{ userSelect: "text" }}>{content}</span>
                  <small className="text-muted text-right d-block">
                    {printTime}
                  </small>
                </div>
              );
            })}
          </div>
          <div className="d-flex input-group w-100 mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Type your message"
              value={this.state.message}
              onKeyPress={(e) => {
                if (e.key !== "Enter") return;
                this.sendMessage(this.state.message);
              }}
              onChange={(e) => this.setState({ message: e.target.value })}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.sendMessage(this.state.message);
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InGameChat);
