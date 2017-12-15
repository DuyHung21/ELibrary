export default (state = "", action) => {
  switch (action.type){
    case "SAVE_URL_TMP": {
        return action.payload;
    }
    default: return state
  }
}