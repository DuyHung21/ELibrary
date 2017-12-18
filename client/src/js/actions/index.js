import {
  onLoginUser,
  onLogoutUser,
  onRegisterUser,
  onCheckAuth,
  onUpdateUser,
  onChangePass,
  onCheckAuthAdmin,
  getUsersByAdmin,
  onEditUserByAdmin,
  onChangeIsActiveUserByAdmin
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
  getBooksByCategory,
  searchBooks,
  onBookMark
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
  onCheckAuthAdmin,
  getUsersByAdmin,
  onEditUserByAdmin,
  onChangeIsActiveUserByAdmin,
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
  searchBooks,
  onBookMark,
  //Url Tmp
  saveUrlTmp,
  //Faculty 
  getAllInfoFaculty,
}