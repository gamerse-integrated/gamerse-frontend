import * as actions from "../actions";

const initState = {
  score_x: 0,
  score_o: 0,
};

const tictactoeReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.UPDATE_SCORE:
      return action.payload;
    case actions.RESET_SCORE:
      return initState;

    default:
      return state;
  }
};

export default tictactoeReducer;
