import React, { useState, useEffect } from "react";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import php from "@config/php";
import $ from "jquery";
import _ from "lodash";
import app, { db } from "@config/firebaseConfig";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUB,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUB,
  uuid: process.env.REACT_APP_TITLE,
});

function Chatbox({ id, userName }) {
  return (
    <PubNubProvider client={pubnub}>
      <Chat userName={userName} id={id} />
    </PubNubProvider>
  );
}

const getResults = async (id) => {
  let { data } = await php.get("friends.php", {
    params: {
      id: id,
    },
  });
  // console.log(data);
  let result = _.orderBy(data, ["timestamp"]);
  // console.log(result);
  result = _.map(result, "message");
  return result;
};

function Chat({ id, userName }) {
  const pubnub = usePubNub();
  const [channels] = useState([id]);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getResults(id).then((l) => {
      addMessage((messages) => [...l]);
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        1000
      );
    });
  }, [id]);

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
        .then(() => {
          php
            .post("friends.php", {
              friendid: id,
              message:
                "@" +
                userName +
                " / " +
                new Date().toISOString() +
                " / " +
                message,
            })
            .then((res) => {
              db.collection("chats")
                .doc(id)
                .update({
                  count: Math.floor(Math.random() * 100),
                  lastSenderUsername: userName,
                });
            });
          setMessage("");
        });
    }
  };

  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);

  return (
    <div style={{}} className="d-flex flex-column">
      {/* <div style={pageStyles} className="flex-grow-1 d-flex flex-column"> */}
      {/* <div style={chatStyles} className="flex-grow-1"> */}
      <div style={{}} className="position-relative">
        {/* <div style={headerStyles}>React Chat Example</div> */}
        <div
          style={{}}
          className="text-dark h1 text-center rounded shadow-sm p-1 bg-white"
        >
          Personal chat
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
            return (
              <div
                className="shadow-sm"
                key={`message-${index}`}
                style={messageStyles}
              >
                {message}
              </div>
            );
          })}
        </div>
        {/* <div style={footerStyles} className="d-flex"> */}
        <div style={{}} className="d-flex input-group w-100 mt-2">
          <input
            type="text"
            className="form-control"
            // style={inputStyles}
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
              // style={buttonStyles}
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                sendMessage(message);
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

const pageStyles = {
  // alignItems: "center",
  background: "#282c34",
  // display: "flex",
  // justifyContent: "center",
  maxHeight: "100%",
};

const chatStyles = {
  display: "flex",
  flexDirection: "column",
  // height: "50vh",
  // width: "50%",
};

const headerStyles = {
  background: "#323742",
  color: "white",
  fontSize: "1.4rem",
  padding: "10px 15px",
};

const listStyles = {
  alignItems: "flex-start",
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "auto",
  // padding: "10px",
};

const messageStyles = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  color: "black",
  fontSize: "1.1rem",
  margin: "5px",
  padding: "8px 15px",
};

const footerStyles = {
  display: "flex",
};

const inputStyles = {
  flexGrow: 1,
  fontSize: "1.1rem",
  padding: "10px 15px",
};

const buttonStyles = {
  fontSize: "1.1rem",
  padding: "10px 15px",
};

export default Chatbox;
