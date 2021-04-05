import React, { Component } from "react";
import { auth } from "@config/firebaseConfig";
import TicTacToe from "./TicTacToe";
import InGameChat from "../InGameChat";
import php from "@config/php";
import { Route } from "react-router";
import { Header } from "@components/shared/Header";
// import BG from "./grass4.png";

export default class TTTfriend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendId: this.props.match.params.id,
    };
  }

  componentDidMount() {
    // php
    //   .post("friends.php", {
    //     id: this.props.friendId,
    //   })
    //   .then(({ data }) => {
    //     this.setState({ id: data.id });
    //   })
    //   .catch((e) => console.log(e));
  }

  render() {
    return (
      <div id="ttteasy" className="bg min-vh-100 d-flex flex-column">
        <Route component={(props) => <Header {...props}></Header>}></Route>

        {/* chat box */}

        {/* <div
          id="chatbox"
          style={{
            backgroundColor: "white",
            width: "30vw",
            height: "60vh",
            position: "absolute",
            bottom: "0",
            right: "1rem",
            zIndex: "2",
            borderRadius: "1.2rem 1.2rem 0 0",
            padding: "2rem",
          }}
        >
          <p>Chat box</p>
        </div> */}

        {/* game */}
        <div className="d-flex flex-row flex-grow-1">
          <div className="col-7 d-flex justify-content-center align-items-center">
            <div
              id="ttt"
              className="shadow p-3 bg-white"
              style={{ borderRadius: "1.2rem" }}
            >
              <TicTacToe></TicTacToe>
            </div>
          </div>
          <div className="col-5 d-flex flex-column justify-content-around align-items-center p-5">
            <div
              className="d-flex justify-content-between align-items-center flex-shrink-1 shadow px-4 pt-4 text-black mb-4"
              style={{
                borderRadius: "1.4rem",
                width: "80%",
                backgroundColor: "#ffffffaa",
              }}
            >
              <div className="d-flex flex-column justify-content-between">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7uvXoS3qjbJf_hCsQEi7vFBYCBPifsDl34w&usqp=CAU"
                  alt="You"
                  className="img-responsive d-block rounded-circle shadow"
                  style={{
                    width: "6rem",
                    height: "6rem",
                  }}
                />
                <p
                  className="text-center pt-4"
                  style={{
                    fontSize: "5rem",
                    fontWeight: "bold",
                  }}
                >
                  3
                </p>
              </div>
              <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a3f544f1-f07b-4aa9-b6f9-824148c31a10/daqrpoq-f7ee01ed-ac8e-4c47-86c9-360f670365d2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTNmNTQ0ZjEtZjA3Yi00YWE5LWI2ZjktODI0MTQ4YzMxYTEwXC9kYXFycG9xLWY3ZWUwMWVkLWFjOGUtNGM0Ny04NmM5LTM2MGY2NzAzNjVkMi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.37GhMgHrxdiLQPB8OPtK_04vGDSUum7EM4vxWzmkzYY"
                alt="VS"
                className="img-responsive"
                style={{ width: "4rem", height: "4rem" }}
              ></img>
              <div className="d-flex flex-column justify-content-between">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzhZFZ6AFPFQZl3z3e9snwPNMlDV1qJqVz2g&usqp=CAU"
                  alt="Computer"
                  className="img-responsive d-block rounded-circle shadow"
                  style={{
                    width: "6rem",
                    height: "6rem",
                  }}
                />
                <p
                  className="text-center pt-4"
                  style={{
                    fontSize: "5rem",
                    fontWeight: "bold",
                  }}
                >
                  2
                </p>
              </div>
            </div>
            <div
              id="chatbox"
              className="flex-grow-1 shadow-lg border-0"
              style={{
                backgroundColor: "#ffffffee",
                width: "100%",
                // height: "60vh",
                // position: "absolute",
                // bottom: "0",
                // right: "1rem",
                // zIndex: "2",
                borderRadius: "1.2rem",
                padding: "2rem",
              }}
            >
              <InGameChat id={this.state.friendId}></InGameChat>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
