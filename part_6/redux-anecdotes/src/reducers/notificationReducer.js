const initialState = ''
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'msg': {
      state = action.msg
      break
    }
    default:
      break
  }
  return state
}

export const newMsg = (msg,delay) => (dispatch) => {
  dispatch({ type: 'msg', msg })
  setTimeout(() => {
    dispatch({ type: 'msg', msg:'' })
  },delay*1000)
}

export default reducer