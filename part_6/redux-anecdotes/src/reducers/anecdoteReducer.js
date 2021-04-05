const getId = () => (100000 * Math.random()).toFixed(0)

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

export const initializeAnecdote = (data) => {
  return {
    type: 'INIT_ANECDOTE',
    data,
  }
}

export const addVote = (id) => {
  return {
    type: 'add-vote',
    data: {id}
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'add-anecdote',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer