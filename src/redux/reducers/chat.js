import * as actions from "../actions";

const initState = {
  requests: [],
  players: [],
  friends: [],
  userName: null,
  chatWithId: null,
  loading: true,
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.ACCEPT_REQUEST:
      return {
        ...state,
        requests: [...state.requests.filter((r) => r["id"] !== action.payload)],
      };
    case actions.REJECT_REQUEST:
      return {
        ...state,
        requests: [...state.requests.filter((r) => r["id"] !== action.payload)],
      };
    case actions.CHALLENGE_RECEIVED:
      return state;
    case actions.CHANGE_CHAT_WINDOW:
      return { ...state, chatWithId: action.payload };
    case actions.RECEIVED_CHAT_MESSAGE:
      return state;
    case actions.REMOVE_FRIEND:
      return {
        ...state,
        friends: [...state.friends.filter((p) => p["id"] !== action.payload)],
        chatWithId: null,
      };
    case actions.SEND_CHALLENGE:
      return state;
    case actions.SEND_MESSAGE:
      return state;
    case actions.FETCH_DATA:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default chatReducer;
