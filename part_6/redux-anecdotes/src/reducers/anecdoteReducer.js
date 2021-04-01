const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = anecdotesAtStart.map((anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
})

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
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
  
    default:
      break;
  }
  return state
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