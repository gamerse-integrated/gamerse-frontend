import php from "@config/php";
import $ from "jquery";
import _ from "lodash";
import { db } from "@config/firebaseConfig";
import { connect } from "react-redux";
import PubNub from "pubnub";
import { usePubNub } from "pubnub-react";
import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUB,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUB,
  uuid: process.env.REACT_APP_TITLE,
});

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

const getResults = async (id) => {
  try {
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
  } catch (e) {
    return [];
  }
};

function Chat({ id, userName }) {
  const pubnub = usePubNub();
  const [channels] = useState([id]);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    pubnub.unsubscribeAll();
    const handleMessage = (event) => {
      NotificationManager.error("message");
      const message = event.message;
      if (typeof message === "string" || message.hasOwnProperty("text")) {
        const text = message.text || message;
        addMessage((messages) => [...messages, text + channels[0]]);
        $("#chatStyle").animate(
          { scrollTop: $("#chatStyle").prop("scrollHeight") },
          300
        );
      }
    };
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
    getResults(id).then((l) => {
      addMessage((messages) => [...l]);
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        300
      );
    });
  }, [pubnub, channels, id]);

  const sendMessage = (message) => {
    if (message) {
      $("#chatStyle").animate(
        { scrollTop: $("#chatStyle").prop("scrollHeight") },
        300
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
                  challenge: false,
                  challenger: "",
                  challengee: "",
                });
              setMessage("");
            });
        });
    }
  };

  return (
    <div style={{}} className="d-flex flex-column">
      {/* <div style={pageStyles} className="flex-grow-1 d-flex flex-column"> */}
      {/* <div style={chatStyles} className="flex-grow-1"> */}
      <div style={{}} className="position-relative">
        {/* <div style={headerStyles}>React Chat Example</div> */}
        <div
          style={{}}
          className="text-dark font-weight-bold h1 text-center p-1 bg-white"
        >
          Personal Chat
          {/* {userName} */}
        </div>
        {/* <div style={listStyles}> */}
        <div
          style={{
            maxHeight: "66vh",
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
                className="shadow-sm"
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

const mapStateToProps = ({ chatReducer }) => ({
  id: chatReducer.chatWithId,
  userName: chatReducer.userName,
});

export default connect(mapStateToProps)(Chat);
