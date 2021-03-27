import * as actions from "../actions";

const initState = {
  messages: [],
};

const chatReducer = (state = initState, action) => {
  switch (action.payload) {
    case actions.NEW_MESSAGE:
      return state;

    default:
      return state;
  }
};

export default chatReducer;
