import anecdoteService from '../services/anecdote.js'
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'add-vote': {
      const id = action.data.id
      const oldAnecdote = state.find(i => i.id === id)
      const aAnecdote = {
        ...oldAnecdote,
        votes: oldAnecdote.votes+1
      }
      return state.map(i =>i.id !== id ? i : aAnecdote )
    }
      
    case 'add-anecdote': {
      return [...state,action.data]
    }
      
    case 'INIT_ANECDOTE': {
      return action.data
    }
  
    default:
      break;
  }
  return state
}

export const initializeAnecdote = (data) => async (dispatch, getState) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data:anecdotes,
    })
}

export const addVote = (id) => {
  return {
    type: 'add-vote',
    data: {id}
  }
}

export const create = (data) => {
  return {
    type: 'add-anecdote',
    data
  }
}

export default reducer