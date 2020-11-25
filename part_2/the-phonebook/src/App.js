import React, { useState } from 'react'
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([{
    id: 0,
    name: 'Arto Hellas',
    number: '123'
  }])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  let id = 0

  const nameHandler = (e) => {
    setNewName(e.target.value)
  }

  const numberHandler = (e) => {
    setNewNumber(e.target.value)
  }

  const submitName = (e) => {
    e.preventDefault()
    // prevent duplicate person name
    for (let person of persons.values()) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }

    id++
    setPersons([
      ...persons,
      {
        id,
        name: newName,
        number: newNumber
      }
    ])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitName}>
        <div>name: <input value={newName} onChange={nameHandler} /></div>
        <div>number: <input value={newNumber} onChange={numberHandler} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person) => {
          return (
            <div key={person.id}>{person.name} {person.number}</div>
          )
        })
      }
    </div>
  )
}

export default App
