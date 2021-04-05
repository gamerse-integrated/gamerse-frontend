import * as actions from "@redux/actions";

export const updateScoreX = (data) => ({
  type: actions.UPDATE_SCORE_X,
  payload: data,
});
export const updateScoreO = (data) => ({
  type: actions.UPDATE_SCORE_O,
  payload: data,
});
export const updateScoreTie = (data) => ({
  type: actions.UPDATE_SCORE_TIE,
  payload: data,
});
export const resetScore = (data) => ({
  type: actions.RESET_SCORE,
  payload: data,
});
