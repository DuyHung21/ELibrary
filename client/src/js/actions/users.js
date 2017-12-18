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

export const onCheckAuthAdmin = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      const curUser = window.atob(token.split(".")[1]);
      if (curUser.username === "admin") {
        dispatch({
          type: "ON_LOGIN_USER",
          payload: JSON.parse(curUser),
        });
      }
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
    return request().post(`/api/users/${curUser.id}`, {...user}).then(res=>{
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

export const onEditUserByAdmin = (user) => {
  return dispatch => {
    const userEdit = {
      username: user.USER_NAME,
      email: user.USER_EMAIL,
      fullname: user.USER_FULLNAME,
      phone: user.USER_PHONE
    }
    return request().post(`/api/users/${user.USER_ID}`, {...userEdit}).then(res=>{
      // console.log(res);
    })
  }
}

export const onChangeIsActiveUserByAdmin = (user) => {
  return dispatch => {
    return request().post(`/api/users/${user.USER_ID}/${user.USER_IS_ACTIVE ? "disable" : "enable"}`).then(res=>{
      console.log(res);
    })
  }
}

export const onChangePass = (infoPass) => {
  return dispatch => {
    const curUser = JSON.parse(localStorage.getItem("dataUser"));
    return request().post(`/api/users/${curUser.id}/password`, {...infoPass}).then(res=>{
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
  localStorage.removeItem("dataUser");
  return {
    type: "ON_LOGOUT_USER",
    payload: [],
  }
}

export const getUsersByAdmin = () => {
  return dispatch => {
    return request().get("/api/users")
    .then(res => {
      console.log(res);
      dispatch({
        type: "ALL_USER_FOR_ADMIN",
        payload: res.data
      })
    })
  }
}