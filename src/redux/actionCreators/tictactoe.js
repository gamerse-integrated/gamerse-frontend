import * as actions from "@redux/actions";

export const updateScore = (data) => ({
  type: actions.UPDATE_SCORE,
  payload: data,
});
export const resetScore = (data) => ({
  type: actions.RESET_SCORE,
  payload: data,
});
