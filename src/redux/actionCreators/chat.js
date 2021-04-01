import * as actions from "@redux/actions";

export const acceptRequest = (data) => ({
  type: actions.ACCEPT_REQUEST,
  payload: data,
});

export const greet = (data) => ({
  type: actions.GREET,
  payload: data,
});

export const fetchData = (data) => ({
  type: actions.FETCH_DATA,
  payload: data,
});

export const rejectRequest = (data) => ({
  type: actions.REJECT_REQUEST,
  payload: data,
});

export const challengeReceived = (data) => ({
  type: actions.CHALLENGE_RECEIVED,
  payload: data,
});

export const removeFriend = (data) => ({
  type: actions.REMOVE_FRIEND,
  payload: data,
});

export const sendMessage = (data) => ({
  type: actions.SEND_MESSAGE,
  payload: data,
});

export const changeChatWindow = (data) => ({
  type: actions.CHANGE_CHAT_WINDOW,
  payload: data,
});

export const receivedChatMessage = (data) => ({
  type: actions.RECEIVED_CHAT_MESSAGE,
  payload: data,
});

export const sendChallenge = (data) => ({
  type: actions.SEND_CHALLENGE,
  payload: data,
});
