import React from 'react'

const persons = ({
  personsToShow
}) => {
  return (
    <>
      {
        personsToShow.map((person) => {
          return (
            <div key={person.name}>{person.name} {person.number}</div>
          )
        })
      }
    </>
  )
}

export default persons