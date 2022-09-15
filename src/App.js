import "./App.css";
import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import combinedReducer from "./../src/redux/combinedReducers";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "../src/screens/dashboard/dashboard";
import { WatchList } from "../src/screens/watchList/watchList";
const ReduxThunk = require("redux-thunk").default;

let composeEnhancer = compose;
export const store = createStore(
  //creates an instance of store to be used globally
  combinedReducer, // pass in the combined reducers
  composeEnhancer(applyMiddleware(ReduxThunk)) // use the middleware for async actions
);
export default function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/watchlist" component={WatchList} />
          <Route path="/article/:id" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}