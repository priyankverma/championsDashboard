import { combineReducers } from "redux";
import listingReducer from "./reducers/listingReducer";
import watchListReducer from "./reducers/watchListReducer";
export default combineReducers({
  listingReducer,
  watchListReducer,
});
