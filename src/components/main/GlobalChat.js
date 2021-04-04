import React, { useState, useEffect } from "react";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import $ from "jquery";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUB,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUB,
  uuid: process.env.REACT_APP_TITLE,
});

function Chatbox({ userName }) {
  return (
    <PubNubProvider client={pubnub}>
      <Chat userName={userName} />
    </PubNubProvider>
  );
}

// const genRanHex = (size) =>
//   [...Array(size)]
//     .map(() => Math.floor(Math.random() * 16).toString(16))
//     .join("");

const hashCode = (str) => {
  // java String#hashCode
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = (i) => {
  let c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
};

function Chat({ userName }) {
  const pubnub = usePubNub();
  const [channels] = useState(["global-chat"]);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    const message = event.message;
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message;
      addMessage((messages) => [...messages, text]);
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        1000
      );
    }
  };

  const sendMessage = (message) => {
    if (message) {
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        1000
      );
      pubnub
        .publish({
          channel: channels[0],
          message:
            "@" + userName + " / " + new Date().toISOString() + " / " + message,
        })
        .then(() => setMessage(""));
    }
  };

  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);

  return (
    <div id="GLOBALCHAT" className="d-flex flex-column">
      <div style={{}} className="position-relative">
        <div className="text-uppercas h1 text-center font-weight-bold">
          Global Chat
        </div>
        {/* <div style={listStyles}> */}
        <div
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
          }}
          id="chatStyle"
          className=""
        >
          {messages.map((message, index) => {
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
                className="shadow-sm animate__animated animate__fadeIn"
                key={`message-${index}`}
                style={messageStyles}
              >
                <small
                  className="text- d-block"
                  style={{
                    // color: `#${genRanHex(6)}`,
                    color: `${intToRGB(hashCode(sender))}`,
                  }}
                >
                  {sender}
                </small>
                <span style={{ userSelect: "" }}>{content}</span>
                <small className="text-muted text-right d-block">
                  {printTime}
                </small>
              </div>
            );
          })}
        </div>
        <div style={{}} className="d-flex input-group w-100 mt-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message"
            value={message}
            onKeyPress={(e) => {
              if (e.key !== "Enter") return;
              sendMessage(message);
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                sendMessage(message);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-arrow-right-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const messageStyles = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  color: "black",
  fontSize: "1.1rem",
  margin: "5px",
  padding: "8px 15px",
};

export default Chatbox;
