import React from 'react'

const persons = ({
  personsToShow,
  deletePerson
}) => {
  return (
    <>
      {
        personsToShow.map((person) => {
          return (
            <div key={person.name}>
              {person.name}
              {person.number}
              <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
          )
        })
      }
    </>
  )
}

export default persons
