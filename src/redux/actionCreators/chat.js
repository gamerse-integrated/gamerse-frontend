import { NEW_MESSAGE } from "@redux/actions";

const sendMessage = (message) => ({
  type: NEW_MESSAGE,
  payload: message,
});

export { sendMessage };
