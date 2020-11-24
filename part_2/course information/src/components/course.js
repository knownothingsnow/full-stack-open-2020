import React from 'react'

const Header = ({ courseName }) => (
  <h2>{courseName}</h2>
)

const Content = ({ parts }) => (
  <>
    {
      parts.map((part) => <Part key={part.id} part={part}></Part>)
    }
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
  const total = parts.reduce((sum, current) => {
    sum += current.exercises
    return sum
  }, 0)
  return (
    <p>total of exercises {total}</p>
  )
}

const Course = ({ courses }) => {
  return (
    <>
      {
        courses.map((aCourse) => {
          const { id, name, parts } = aCourse
          return (
            <div key={id}>
              <Header courseName={name}></Header>
              <Content parts={parts}></Content>
              <Total parts={parts}></Total>
            </div>
          )
        }
        )
      }
    </>
  )
}

export default Course