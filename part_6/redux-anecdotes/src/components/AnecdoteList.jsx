import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './Filter'
import { addVote,initializeAnecdote } from '../reducers/anecdoteReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdote())
  }, [dispatch])
  
  const anecdotes = useSelector(state => {
    if (!state.filter) return state.anecdotes
    return state.anecdotes.filter(({content,vote}) => {
      if (!content.match(new RegExp(state.filter, 'g'))) return null
        return { content, vote }
    })
  })

  const vote = (id) => {
    dispatch(addVote(id))
  }

  return <>
      <Filter/>
      {anecdotes.sort((a, b) => b.votes-a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
  </>
}

export default AnecdoteList