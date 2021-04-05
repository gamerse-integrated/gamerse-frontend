import { combineReducers } from "redux";
import chatReducer from "./chat";
import tictactoeReducer from "./tictactoe";

export default combineReducers({
  chatReducer: chatReducer,
  tictactoe: tictactoeReducer,
});
