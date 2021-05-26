import { types } from "./../actionTypes/actionTypes";
import { message } from "antd";

const watchListReducer = (
  state = {
    watchList: [],
    watchListLoading: false,
  },
  action
) => {
  switch (action.type) {
    case types.ADD_TO_WATCHLIST_REQUEST: {
      //checks if champion is already added to the list, if it is found, then do not push it again
      if (
        state.watchList.some((champion, idx) => {
          if (champion.id === action.championToAdd.id) {
            return {
              ...state,
              watchList: state.watchList,
            };
          }
          return null;
        })
      ) {
        message.info("Already added this record to watch list.");

        return {
          ...state,
          watchList: state.watchList,
        };
      } else {
        // champion not found in the list, push this record into the list
        return {
          ...state,
          watchList: [...state.watchList, action.championToAdd],
          watchListLoading: true,
        };
      }
    }
    case types.REMOVE_FROM_WATCHLIST_REQUEST: {
      //checks if champion is present in the list, if it is found, then remove it
      if (
        state.watchList.some((champion, idx) => {
          if (champion.id === action.championToAdd.id) {
            return {
              ...state,
              watchList: state.watchList.splice(idx, 1),
            };
          }
          return null;
        })
      ) {
        return {
          ...state,
          watchList: state.watchList,
        };
      } else {
        // champion not found in the list, show pop up

        // eslint-disable-next-line no-unused-expressions
        action.donotShowMessage
          ? null
          : message.error("This record was not found in the watch list.");

        return {
          ...state,
          watchList: state.watchList,
        };
      }
    }

    default:
      return state;
  }
};
export default watchListReducer;
