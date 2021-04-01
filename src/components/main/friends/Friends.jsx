import { Loading } from "@components/shared/Loading";
import Header from "@shared/Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import "./Friends.scss";
import { FriendsMainContent } from "./FriendsMainContent";

// chatbox
// www.npmjs.com/package/chat-ui-react ==> using cdn

// API for context menu dependency
// https://github.com/vkbansal/react-contextmenu/blob/master/docs/api.md
export class Friends extends Component {
  render() {
    return (
      <div>
        <div className="min-vh-100 d-flex flex-column">
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
