import { request } from "../api";

export const getAllInfoFaculty = () => {
  return dispatch => {
    request().get("/api/categories")
    .then(res => {
      dispatch({
        type: "GET_FACULTY",
        payload: res.data.categories
      })
    })
  }
}