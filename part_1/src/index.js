import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <>
    <Part unit={props.units[0]}></Part>
    <Part unit={props.units[1]}></Part>
    <Part unit={props.units[2]}></Part>
  </>
)

const Part = (props) => {
  return (
    <p>
      {props.unit.part} {props.unit.exercises}
    </p>
  )
}

const Total = (props) => {
  const unitsArr = props.units
  let total = 0
  for (let i = 0; i < unitsArr.length; i++) {
    total += unitsArr[i].exercises
  }
  return (
    <p>Number of exercises {total}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'

  const units = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}></Header>
      <Content units={units}></Content>
      <Total units={units}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))