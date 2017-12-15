import { request, BASE_URL } from "../api"
import axios from "axios";

export const onCheckAuth = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      const curUser = window.atob(token.split(".")[1]);
      dispatch({
        type: "ON_LOGIN_USER",
        payload: JSON.parse(curUser),
      });
    }
  }
}

export const onLoginUser = (user) =>{
  return dispatch => {
    return request().post("/api/users/login", {
      ...user      
    }).then(res => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      const curUser = window.atob(token.split(".")[1]);
      localStorage.setItem("dataUser", curUser);
      dispatch({
        type: "ON_LOGIN_USER",
        payload: JSON.parse(curUser),
      })
    });
  }
}

export const onRegisterUser = (user) =>{
  return (dispatch) =>{
    return request().post("/api/users", {
      ...user      
    }).then(res => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      const curUser = window.atob(token.split(".")[1]);
      localStorage.setItem("dataUser", curUser);
      dispatch({
        type: "ON_LOGIN_USER",
        payload: JSON.parse(curUser),
      })
    });
  }
}

export const onUpdateUser = (user) => {
  return dispatch => {
    const curUser = JSON.parse(localStorage.getItem("dataUser"));
    return request().put(`/users/${curUser.id}`, {...user}).then(res=>{
      const token = res.data.token;
      localStorage.setItem("token", token);
      const curUser = window.atob(token.split(".")[1]);
      localStorage.setItem("dataUser", curUser);
      dispatch({
        type: "ON_LOGIN_USER",
        payload: JSON.parse(curUser),
      })
    })
  }
}

export const onChangePass = (infoPass) => {
  return dispatch => {
    const curUser = JSON.parse(localStorage.getItem("dataUser"));
    return request().put(`/users/${curUser.id}/password`, {...infoPass}).then(res=>{
      const token = res.data.token;
      localStorage.setItem("token", token);
      const curUser = window.atob(token.split(".")[1]);
      localStorage.setItem("dataUser", curUser);
      dispatch({
        type: "ON_LOGIN_USER",
        payload: JSON.parse(curUser),
      })
    })
  }
}

export const onLogoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("curUser");
  return {
    type: "ON_LOGOUT_USER",
    payload: [],
  }
}