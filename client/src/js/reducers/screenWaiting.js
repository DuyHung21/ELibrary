export default (state = false, action) => {
  switch(action.type) {
    case "DITPATCH_WAITING": {
      return action.payload;
    }
    default: return state
  }
}