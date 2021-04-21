const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'msg': {
      state = {
        ...state,
        msg: action.msg
      }
      break
    }
    case 'newTimer': {
      state = {
        ...state,
        timer:action.timer
      }
      break
    }
    default:
      break
  }
  return state
}

export const newMsg = (msg, delay = 0) => (dispatch, getState) => {
  dispatch({ type: 'msg', msg })
  clearTimeout(getState().notification.timer)
  const timer = setTimeout(() => { dispatch({ type: 'msg', msg: '' }) }, delay * 1000)
  dispatch({type:'newTimer',timer})
}

export default reducer