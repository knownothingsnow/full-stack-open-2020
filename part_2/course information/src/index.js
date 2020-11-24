import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/course'

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          id: 0,
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          id: 1,
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          id: 2,
          name: 'State of a component',
          exercises: 14
        },
        {
          id: 3,
          name: 'Redux',
          exercises: 11
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))