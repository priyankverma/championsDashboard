import { types } from "./../actionTypes/actionTypes";
const listingReducer = (
  state = {
    data: null,
    loading: false,
    championsList: null,
    searchedResults: [],
    searchLoading: false,
  },
  action
) => {
  switch (action.type) {
    case types.LIST_REQUEST: {
      return {
        ...state,
        championsList: null,
        loading: true,
      };
    }
    case types.LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        championsList: action.championsList,
      };
    }
    case types.LIST_FAILED: {
      return {
        ...state,
        loading: false,
        championsList: null,
      };
    }

    case types.SEARCH_REQUEST: {
      return {
        ...state,
        searchedResults: [],
        searchLoading: true,
      };
    }
    case types.SEARCH_SUCCESS: {
      return {
        ...state,
        searchLoading: false,
        searchedResults: action.searchedResults,
      };
    }
    case types.SEARCH_FAILED: {
      return {
        ...state,
        searchLoading: false,
        searchedResults: [],
      };
    }
    default:
      return state;
  }
};
export default listingReducer;
