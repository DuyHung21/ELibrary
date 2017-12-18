export default (state = [], action) => {
  switch(action.type) {
    case "ALL_USER_FOR_ADMIN" : {
      return action.payload
    }
    default: return state
  }
}