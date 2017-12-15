import { request } from "../api";

export const getAllInfoFaculty = () => {
  return dispatch => {
    request().get("/api/categories")
    .then(res => {
      // console.log(res.data.categories);
      dispatch({
        type: "GET_FACULTY",
        payload: res.data.categories
      })
    })
  }
}