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
  getAllBooksByLibrarian,
  approveBook,
  banBook,
  getBooksUploaded,
  getBooksDownloaded,
  getBooksByCategory
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
  approveBook,
  banBook,
  getBooksUploaded,
  getBooksDownloaded,
  getBooksByCategory,
  //Url Tmp
  saveUrlTmp,
  //Faculty 
  getAllInfoFaculty,
}