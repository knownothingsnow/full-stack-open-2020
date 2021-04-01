const initialState = 'initial msg'
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'msg': {
      state = {
        ...state,
        msg:action.msg
      }
      break
    }
    default:
      break
  }
  return state
}

export const newMsg = (msg) => ({ type: 'msg', msg })

export default reducer