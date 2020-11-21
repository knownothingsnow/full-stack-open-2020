import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]}></Part>
    <Part part={parts[1]}></Part>
    <Part part={parts[2]}></Part>
  </>
)

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  let total = 0
  for (let i = 0; i < parts.length; i++) {
    total += parts[i].exercises
  }
  return (
    <p>Number of exercises {total}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))