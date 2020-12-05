import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import './App.css'

import phoneServices from './services/phoneServices'

const App = () => {
  const [persons, setPersons] = useState([])

  const [searcher, setSearcher] = useState('')

  const [personsToShow, setPersonsToShow] = useState(persons)

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    phoneServices.getAllContacts()
      .then(data => {
        setPersons(data)
        setPersonsToShow(data)
      })
  }, [])

  const clear = () => {
    setNewName('')
    setNewNumber('')
    setSearcher('')
  }

  const nameHandler = (e) => {
    setNewName(e.target.value)
  }

  const numberHandler = (e) => {
    setNewNumber(e.target.value)
  }

  const deletePerson = id => {
    if (window.confirm(`Delete ${persons.filter(person => person.id === id)[0].name}`)) {
      phoneServices.deleteContacts(id)
        .then(res => {
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
          setPersonsToShow(newPersons)
        })
    }
  }

  const submitName = (e) => {
    e.preventDefault()
    const newGuy = {
      name: newName,
      number: newNumber
    }
    // update duplicate person name
    for (const person of persons.values()) {
      if (person.name === newName) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          phoneServices.updateContacts(person.id, newGuy)
            .then(data => {
              setPersons(persons.map(p => p.id !== person.id ? p : data))
              setPersonsToShow(personsToShow.map(p => p.id !== person.id ? p : data))
              clear()
            })
        }
        return
      }
    }

    phoneServices.createContacts(newGuy)
      .then(data => {
        const newPersons = [
          ...persons,
          data
        ]
        setPersons(newPersons)
        // reset searcher after add new person
        setPersonsToShow(newPersons)
        clear()
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        setPersonsToShow={setPersonsToShow}
        searcher={searcher}
        setSearcher={setSearcher}
      />
      <h2>add a new</h2>
      <PersonForm
        submitName={submitName}
        newName={newName}
        nameHandler={nameHandler}
        newNumber={newNumber}
        numberHandler={numberHandler}
      />

      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
