import {combineReducers} from 'redux';
import userActive from "./userActive";
import books from "./books";
import urlTmp from "./urlTmp";
import faculties from "./faculty";
import isLoadingScreen from "./screenWaiting";

const rootReducers = combineReducers({
  userActive,
  books,
  urlTmp,
  faculties,
  isLoadingScreen
});

export default rootReducers;