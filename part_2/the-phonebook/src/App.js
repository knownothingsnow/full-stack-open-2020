import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import './App.css';

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [searcher, setSearcher] = useState('')

  const [personsToShow, setPersonsToShow] = useState(persons)

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
        setPersonsToShow(res.data)
      })
  }, [])

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

    const newPersons = [
      ...persons,
      {
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
      <Filter
        persons={persons}
        setPersonsToShow={setPersonsToShow}
        searcher={searcher}
        setSearcher={setSearcher}
      ></Filter>
      <h2>add a new</h2>
      <PersonForm
        submitName={submitName}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      ></PersonForm>

      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
      ></Persons>
    </div>
  )
}

export default App
