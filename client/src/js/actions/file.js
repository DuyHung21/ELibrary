import { request, BASE_URL } from "../api"
import axios from "axios";

export const uploadFile = uploadFile => {
  return dispatch => {
    return request().post("/api/books", uploadFile)
    .then(res => {
      console.log(res);
    })
  }
}

export const getAllBooks = () => {
  return dispatch => {
    return request().get("/api/books")
    .then(res => {
      dispatch({
        type: "GET_ALL_BOOK",
        payload: res.data
      })
      // console.log(res);
    })
  }
}

export const getCatBooks = (obj) => {
  return dispatch => {
    return request().get("/api/books", {obj})
    .then(res => {
      console.log(res);
    })
  }
}

export const getInfoBook = id => {
  return dispatch => {
    return request().get("/api/books", {id})
    .then(res => {
      console.log(res);
    })
  }
}