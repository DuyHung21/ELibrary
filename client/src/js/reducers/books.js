export default (state = {}, action) => {
  switch (action.type){
    case "GET_ALL_BOOK": {
      // console.log(action.payload);
      return {
        ...state,
        allBooks: action.payload
      };
    }
    default: return state
  }
}