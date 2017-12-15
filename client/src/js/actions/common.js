export const dispatchScreenWaiting = (isLoading) => {
  return dispatch => {
    dispatch({
      type: "DITPATCH_WAITING",
      payload: isLoading,
    })
  }
}