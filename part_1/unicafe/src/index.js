import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addCount = (flag) => {
    if (flag === 'good') return () => setGood(good + 1)
    if (flag === 'neutral') return () => setNeutral(neutral + 1)
    if (flag === 'bad') return () => setBad(bad + 1)
  }

  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = good / all || 0

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <button onClick={addCount('good')}>good</button>
        <button onClick={addCount('neutral')}>neutral</button>
        <button onClick={addCount('bad')}>bad</button>
      </div>

      <div>
        <h2>statistics</h2>
        <div>good: {good}</div>
        <div>neutral: {neutral}</div>
        <div>bad: {bad}</div>
        <div>all: {all}</div>
        <div>average: {average}</div>
        <div>positive: {positive}</div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)