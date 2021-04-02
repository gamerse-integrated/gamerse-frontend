import React, { Component } from "react";
import { connect } from "react-redux";
import PubNub from "pubnub";
import php from "@config/php";
import $ from "jquery";
import _ from "lodash";
import { db } from "@config/firebaseConfig";
import { NotificationManager } from "react-notifications";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUB,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUB,
  uuid: process.env.REACT_APP_TITLE,
});

export class ChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      channels: [this.props.id],
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

  getResults = async (id) => {
    try {
      let { data } = await php.get("friends.php", {
        params: {
          id: id,
        },
      });
      let result = _.orderBy(data, ["timestamp"]);
      result = _.map(result, "message");
      return result;
    } catch (e) {
      return [];
    }
  };

  sendMessage = (message) => {
    if (message) {
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        300
      );
      pubnub
        .publish({
          channel: this.state.channels[0],
          message:
            "@" +
            this.props.userName +
            " / " +
            new Date().toISOString() +
            " / " +
            message,
        })
        .then(() => {
          php
            .post("friends.php", {
              friendid: this.props.id,
              message:
                "@" +
                this.props.userName +
                " / " +
                new Date().toISOString() +
                " / " +
                message,
            })
            .then((res) => {
              db.collection("chats")
                .doc(this.props.id)
                .update({
                  count: Math.floor(Math.random() * 100),
                  lastSenderUsername: this.props.userName,
                  challenge: false,
                  challenger: "",
                  challengee: "",
                });
              this.setState({ message: "" });
            });
        });
    }
  };

  handleMessage = (event) => {
    // NotificationManager.error("message");
    const message = event.message;
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message;
      this.setState((prevState) => {
        return { messages: [...prevState.messages, text] };
      });
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        300
      );
    }
  };

  getData = (id) =>
    this.getResults(id).then((messages) => {
      this.setState({ messages: [...messages] });
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        300
      );
    });

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.state.channels[0]) {
      pubnub.unsubscribe({
        channels: this.state.channels,
      });
      this.setState(
        { channels: [nextProps.id], messages: [], message: "" },
        () => {
          pubnub.subscribe({ channels: [nextProps.id] });
          this.getData(nextProps.id);
        }
      );
    }
  }

  componentDidMount() {
    this.getData(this.props.id);

    pubnub.addListener({ message: this.handleMessage });
    pubnub.subscribe({ channels: this.state.channels });
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <div className="position-relative">
          <div className="text-dark font-weight-bold h1 text-center p-1 bg-white">
            Personal Chat
          </div>
          <div
            style={{
              maxHeight: "66vh",
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
              let content = Array.from(messageParts).splice(2).join(" / ");
              return (
                <div
                  className="shadow-sm"
                  key={`message-${index}`}
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

const mapStateToProps = ({ chatReducer }) => ({
  id: chatReducer.chatWithId,
  userName: chatReducer.userName,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
