const initialState = ''
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'filter': {
      state = action.filter
      break
    }
    default:
      break
  }
  return state
}

export const setFilter = (filter) => ({ type: 'filter', filter })

export default reducer