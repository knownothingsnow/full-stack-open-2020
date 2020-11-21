import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ title, number }) => (
  <tr>
    <td>{title}</td>
    <td>{number}</td>
  </tr>
)

const Statistics = ({ data }) => {
  const { good, neutral, bad } = data
  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = good / all || 0

  if ((good === 0) && (neutral === 0) && (bad === 0)) {
    return (
      <div>no feedback given</div>
    )
  }

  return (
    <table>
      <caption>statistics</caption>
      <tbody>
        <Statistic title="good" number={good}></Statistic>
        <Statistic title="neutral" number={neutral}></Statistic>
        <Statistic title="bad" number={bad}></Statistic>
        <Statistic title="all" number={all}></Statistic>
        <Statistic title="average" number={average}></Statistic>
        <Statistic title="positive" number={positive}></Statistic>
      </tbody>
    </table>
  )

}

const Button = ({ title, handler }) => <button onClick={handler(title)}>{title}</button>

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

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button title="good" handler={addCount}></Button>
        <Button title="neutral" handler={addCount}></Button>
        <Button title="bad" handler={addCount}></Button>
      </div>

      <Statistics data={{ good, neutral, bad }}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)