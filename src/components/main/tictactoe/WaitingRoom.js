import BackgroundImage from "@assets/7.jpg";
import { Loading } from "@components/shared/Loading";
import { auth, db } from "@config/firebaseConfig";
import Header from "@shared/Header";
import CryptoJS from "crypto-js";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { Route } from "react-router";

export class WaitingRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    /*  
if challenger:
    set flag = 1
    listen():
      if flag ~ 2:
        reset flag ~ 0
    if cancelled:
        set flag ~ 3
        
else:
  if flag = 1:
    set flag = 2
    toGame()
  else if flag = 3:
    prompt("user left")
  else:
    ! not possible
*/

    if (prevState.code !== this.state.code) {
      this.waiter = db
        .collection("chats")
        .doc(this.state.code)
        .onSnapshot((querySnapshot) => {
          let data = querySnapshot.data();

          if (data["challenger"] !== auth.currentUser.email) {
            // opponent has accepted the request
            // set challgee === "2"
            if (data["challengee"] === "1") {
              db.collection("chats")
                .doc(this.state.code)
                .update({
                  challengee: "2",
                })
                .then(() => {
                  // proceed to game
                  this.props.history.replace(
                    `/tttfriend/${this.state.code}/challengee`
                  );
                });
            } else if (data["challengee"] === "3") {
              // challenger has left
              NotificationManager.error("Challenger has left");

              this.props.history.goBack();
            }
          } else {
            // i am challenger

            // waiting for the other player
            if (data["challengee"] === "2") {
              // reset challenger, challenge and proceed to game
              db.collection("chats")
                .doc(this.state.code)
                .update({
                  challenger: "",
                  challenge: false,
                  challengee: "",
                })
                .then(() => {
                  this.props.history.replace(
                    `/tttfriend/${this.state.code}/challenger`
                  );
                });
            }
          }
        });
    }
  }

  componentWillUnmount() {
    // console.log("component unmounted");
    clearInterval(this.wait_check);
    this.waiter();
  }

  componentDidMount() {
    // window.history.pushState(null, null, window.location.href);
    // window.onpopstate = function () {
    //   window.history.go(1);
    // };

    // window.onpopstate = function () {
    //   if (window.confirm("Cancel request and go back?")) {
    //     // yes
    //     // cancel requests
    //     // go back
    //     // window.history.go(1);
    //   } else {
    //     // no
    //     // window.history.pushState(null, null, window.location.href);
    //     // window.history.go(1);
    //     // do nothing
    //   }
    // };

    let friendId = this.props.match.params.id;
    if (friendId.length < 64) {
      NotificationManager.error("Code invalid", "OH NO!");
      this.props.history.goBack();
    }

    let reb64 = CryptoJS.enc.Hex.parse(friendId);
    let bytes = reb64.toString(CryptoJS.enc.Base64);
    let code = CryptoJS.AES.decrypt(bytes, process.env.REACT_APP_TITLE);
    code = code.toString(CryptoJS.enc.Utf8);
    // console.log(code);
    code = code.split("z");
    // time+id+userName
    let timestamp = code[0];
    code = code[1];
    // console.log(code);

    this.setState({ code: code }, () => {
      this.wait_check = setInterval(() => {
        NotificationManager.info("It seems to be taking too long", "Umm...");
        if (
          parseInt(timestamp) +
            parseInt(process.env.REACT_APP_CODE_EXPIRE_DELAY) <
          new Date().getTime()
        ) {
          // code expired
          NotificationManager.error("The code is now expired", "Oops!");
          this.cancelRequest();
        }
      }, 30 * 1000);
    });
  }

  cancelRequest = () => {
    // reset challenger, challengee, challenge
    db.collection("chats")
      .doc(this.state.code)
      .update({
        challenger: "",
        challenge: false,
        challengee: "3",
      })
      .then(() => {
        this.props.history.goBack();
      });
  };

  render() {
    return (
      <div className="d-flex min-vh-100 flex-column">
        <div
          className="w-100"
          style={{
            position: `absolute`,
            height: `100vh`,
            zIndex: -1,
            top: 0,
            left: 0,
            background: `url(${BackgroundImage})`,
            backgroundPosition: `center`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `cover`,
            backgroundColor: `#fff`,
          }}
        />
        <Route component={(props) => <Header {...props}></Header>}></Route>
        <div className="d-flex flex-grow-1 flex-column">
          <Loading
            height={"flex-grow-1"}
            text={
              <>
                <p>Waiting for the other player to join</p>
                <button
                  className="btn btn-primary"
                  onClick={this.cancelRequest}
                >
                  Cancel
                </button>
              </>
            }
          ></Loading>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  myUsername: chatReducer.myUsername,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
