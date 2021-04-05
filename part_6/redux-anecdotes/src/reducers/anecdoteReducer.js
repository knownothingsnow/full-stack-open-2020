import anecdoteService from '../services/anecdote.js'
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE': {
      return state.map(i =>i.id !== action.data.id ? i : action.data )
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

export const addVote = (id) => async (dispatch,getState) => {
  const oldAnecdote = getState().anecdotes.find(i => i.id === id)
  const aAnecdote = {
    ...oldAnecdote,
    votes: oldAnecdote.votes+1
  }
  const newAnecdote = await anecdoteService.vote(aAnecdote)
  dispatch({
    type: 'UPDATE',
    data: newAnecdote
  })
}

export const create = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.create(content)
  dispatch({
    type: 'add-anecdote',
    data: newAnecdote
  })
}

export default reducer