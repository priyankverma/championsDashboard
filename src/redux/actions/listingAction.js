import { types } from "../actionTypes/actionTypes";
import { apiToken, SERVER_URL, _get } from "../../utils/constants";
import axios from 'axios';

export const getChampionsList = () => {
  return (dispatch) => {
    dispatch({ type: types.LIST_REQUEST });
    _get(
      SERVER_URL + "page[number]=1&page[size]=100" + apiToken,
      {},
      {},
      (res) => {
        dispatch({
          type: types.LIST_SUCCESS,
          championsList: res,
        });
      },
      (err) => {
        console.log(err);
        dispatch({ type: types.LIST_FAILED, error: err.message });
      }
    );
  };
};

export const searchChampions = (query) => {
  return (dispatch) => {
    dispatch({ type: types.SEARCH_REQUEST });
    _get(
      SERVER_URL + "search[name]=" + query + "&token=" + apiToken,
      {},
      {},
      (res) => {
        dispatch({
          type: types.SEARCH_SUCCESS,
          searchedResults: res,
        });
      },
      (err) => {
        console.log(err);
        dispatch({ type: types.SEARCH_FAILED, error: err.message });
      }
    );
  };
};
