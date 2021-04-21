import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { addVote, initializeAnecdote } from '../reducers/anecdoteReducer.js'
import { newMsg } from '../reducers/notificationReducer.js'

const AnecdoteList = (props) => {
  useEffect(() => {
    props.initializeAnecdote()
  }, [])

  const vote = (id,content) => {
    props.addVote(id)
    props.newMsg(`you voted '${content}'`,5)
  }

  return <>
      <Filter/>
      {props.anecdotes.sort((a, b) => b.votes-a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      )}
  </>
}

export default connect((state) => {
  if (!state.filter) return {anecdotes:state.anecdotes}
  return {
    anecdotes: state.anecdotes.filter(({ content, vote }) => {
      if (!content.match(new RegExp(state.filter, 'g'))) return null
      return { content, vote }
    })
  }
 }, {
  initializeAnecdote,
  addVote,
  newMsg
})(AnecdoteList)