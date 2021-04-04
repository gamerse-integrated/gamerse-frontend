import { Loading } from "@components/shared/Loading";
import Header from "@shared/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import "./Friends.scss";
import FriendsMainContent from "./FriendsMainContent";
import BackgroundImage from "@assets/5.jpg";

// chatbox
// www.npmjs.com/package/chat-ui-react ==> using cdn

// API for context menu dependency
// https://github.com/vkbansal/react-contextmenu/blob/master/docs/api.md
export class Friends extends Component {
  render() {
    return (
      <div>
        <div className="min-vh-100 d-flex flex-column">
          <div
            className="w-100 d-none"
            style={{
              position: `absolute`,
              height: `100vh`,
              zIndex: 0,
              top: 0,
              left: 0,
              background: `url(${BackgroundImage})`,
              backgroundPosition: `center`,
              backgroundSize: `cover`,
              backgroundColor: `#000000ff`,
            }}
          />
          <Route component={(props) => <Header {...props}></Header>}></Route>
          <Route
            component={(props) => <FriendsMainContent {...props} />}
          ></Route>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
