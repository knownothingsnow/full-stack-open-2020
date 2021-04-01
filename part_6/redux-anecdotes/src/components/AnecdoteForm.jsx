import React from 'react'
import {  useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(e.target.anecdote.value))
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