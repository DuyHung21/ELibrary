import {
  onLoginUser,
  onLogoutUser,
  onRegisterUser,
  onCheckAuth,
  onUpdateUser,
  onChangePass
} from "./users";

import {
  uploadFile,
  getAllBooks,
  getCatBooks,
  getBookId,
  getViewBookId,
  getTopBookView,
  onDowloadBook,
  getAllBooksByLibrarian
} from "./file";

import {
  saveUrlTmp,
} from "./urlTmp";

import {
  getAllInfoFaculty,
} from "./faculty";

import {
  dispatchScreenWaiting,
} from "./common";
export {
  //Common
  dispatchScreenWaiting,
  //Users
  onLoginUser,
  onLogoutUser,
  onRegisterUser,
  onCheckAuth,
  onUpdateUser,
  onChangePass,
  //File
  uploadFile,
  getAllBooks,
  getCatBooks,
  getBookId,
  getViewBookId,
  getTopBookView,
  onDowloadBook,
  getAllBooksByLibrarian,
  //Url Tmp
  saveUrlTmp,
  //Faculty 
  getAllInfoFaculty,
}