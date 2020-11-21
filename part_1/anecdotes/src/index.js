import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [mostVotesAnecdotes, setMostVotesAnecdotes] = useState('')
  const [votes, setVotes] = useState(Array(6).fill(0))

  const next = () => {
    setSelected(getRandomInt(6))
  }

  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    let max = 0
    let maxIndex = 0
    newVotes.forEach((item, index) => {
      if (item > max) {
        max = item
        maxIndex = index
      }
    })

    setMostVotesAnecdotes(anecdotes[maxIndex])
  }

  return (
    <div>
      <h2>anecdotes</h2>
      <div>{anecdotes[selected]}</div>
      <button onClick={vote}>vote</button>
      <button onClick={next}>next anecdote</button>
      <h2>anecdotes with most votes</h2>
      <div>{mostVotesAnecdotes}</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))