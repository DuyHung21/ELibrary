import {combineReducers} from 'redux';
import userActive from "./userActive";
import books from "./books";

const rootReducers = combineReducers({
  userActive,
  books
});

export default rootReducers;