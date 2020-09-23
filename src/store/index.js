import { combineReducers, createStore, compose } from "redux";
import user from "./user";

let reducers = combineReducers({
  user
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers());

window.__store__ = store;

export default store;
 