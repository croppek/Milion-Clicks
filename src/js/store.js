import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import searchReducer from "./reducers/searchReducer";

export default createStore(
   combineReducers({
      searchReducer
   }),
   {},
   applyMiddleware(thunk)
);