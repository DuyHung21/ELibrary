export default (state = [], action) => {
  switch (action.type){
    case "GET_FACULTY": {
        return action.payload;
    }
    default: return state
  }
}