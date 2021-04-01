import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import Chat from "./ChatMain";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUB,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUB,
  uuid: process.env.REACT_APP_TITLE,
});

function Chatbox() {
  return (
    <PubNubProvider client={pubnub}>
      <Chat />
    </PubNubProvider>
  );
}

export default Chatbox;
