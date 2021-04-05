import * as actions from "../actions";

const initState = {
  score_x: 0,
  score_o: 0,
  tie: 0,
};

const tictactoeReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.UPDATE_SCORE_X:
      return { ...state, score_x: state.score_x + 1 };
    case actions.UPDATE_SCORE_O:
      return { ...state, score_o: state.score_o + 1 };
    case actions.UPDATE_SCORE_TIE:
      return { ...state, tie: state.tie + 1 };
    case actions.RESET_SCORE:
      return initState;

    default:
      return state;
  }
};

export default tictactoeReducer;
