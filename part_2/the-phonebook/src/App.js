import React, { useState } from 'react'
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: '123' },
    { id: 1, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 2, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 3, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [searcher, setSearcher] = useState('')

  const [personsToShow, setPersonsToShow] = useState(persons)

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')


  let id = 0

  const searcherHandler = (e) => {
    const newSearcher = e.target.value
    setSearcher(newSearcher)
    const isSercherEmpty = !Boolean(newSearcher)
    const newPersonsToShow = isSercherEmpty
      ? persons
      : persons.filter(person => new RegExp(`${newSearcher}`, 'ig').test(person.name))

    setPersonsToShow(newPersonsToShow)
  }

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
    const newPersons = [
      ...persons,
      {
        id,
        name: newName,
        number: newNumber
      }
    ]
    setPersons(newPersons)
    // reset searcher after add new person
    setPersonsToShow(newPersons)
    setSearcher('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={searcher} onChange={searcherHandler} /></div>
      <h2>add a new</h2>
      <form onSubmit={submitName}>
        <div>name: <input value={newName} onChange={nameHandler} /></div>
        <div>number: <input value={newNumber} onChange={numberHandler} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {
        personsToShow.map((person) => {
          return (
            <div key={person.id}>{person.name} {person.number}</div>
          )
        })
      }
    </div>
  )
}

export default App
