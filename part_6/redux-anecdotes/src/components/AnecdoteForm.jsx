import React from 'react'
import {  useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer.js'
import { newMsg } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const showMsg = ({ content,delay}) => {
    dispatch(newMsg(content,delay))
  }

  const newAnecdote = async (e) => {
    e.preventDefault()
    showMsg({ content: 'new anecdote added', delay: 5 })
    dispatch(create(e.target.anecdote.value))
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={ newAnecdote}>
      <div><input name="anecdote"/></div>
      <button>create</button>
    </form>
  </>
}

export default AnecdoteForm