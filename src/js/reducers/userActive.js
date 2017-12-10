export default (state = {}, action) => {
  switch (action.type){
    case "ON_LOGIN_USER": {
      return action.payload;
    }

    case "ON_LOGOUT_USER": {
      return action.payload;
    }
    default: return state
  }
}