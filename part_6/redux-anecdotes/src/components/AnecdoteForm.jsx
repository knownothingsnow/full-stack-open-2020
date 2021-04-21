import React from 'react'
import {  connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer.js'
import { newMsg } from '../reducers/notificationReducer.js'

const AnecdoteForm = (props) => {
  const showMsg = ({ content,delay}) => {
    props.newMsg(content,delay)
  }

  const newAnecdote = async (e) => {
    e.preventDefault()
    showMsg({ content: 'new anecdote added', delay: 5 })
    props.create(e.target.anecdote.value)
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={ newAnecdote}>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
  </>
}

export default connect(null, {
  create,
  newMsg,
})(AnecdoteForm)