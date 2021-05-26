import { types } from "../actionTypes/actionTypes";

export const addToWatchList = (champion) => {
  return (dispatch) => {
    dispatch({
      type: types.ADD_TO_WATCHLIST_REQUEST,
      championToAdd: champion,
    });
  };
};

export const removeFromWatchList = (champion, donotShowMessage) => {
  return (dispatch) => {
    dispatch({
      type: types.REMOVE_FROM_WATCHLIST_REQUEST,
      championToAdd: champion,
      donotShowMessage: donotShowMessage,
    });
  };
};
