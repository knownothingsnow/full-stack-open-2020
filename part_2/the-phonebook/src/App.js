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

  const emptyMessage = { type: '', content: '' }

  const [message, setMessage] = useState(emptyMessage)

  useEffect(() => {
    phoneServices.getAllContacts()
      .then(data => {
        setPersons(data)
        setPersonsToShow(data)
      })
      .catch(err => {
        setMessage({
          type: 'error',
          content: err.response.data.error
        })
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

  const clearMessageAfter = (second) => setTimeout(() => { setMessage(emptyMessage) }, second * 1000)

  const deletePerson = id => {
    const name = persons.filter(person => person.id === id)[0].name
    if (window.confirm(`Delete ${name}`)) {
      phoneServices.deleteContacts(id)
        .then(res => {
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
          setPersonsToShow(newPersons)
        })
        .catch(err => {
          setMessage({
            type: 'error',
            content: err.response.data.error
          })
          clearMessageAfter(3)
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
              setMessage({
                type: 'success',
                content: `Updated ${newGuy.name}`
              })
              clearMessageAfter(3)
              setPersons(persons.map(p => p.id !== person.id ? p : data))
              setPersonsToShow(personsToShow.map(p => p.id !== person.id ? p : data))
              clear()
            })
            .catch(err => {
              setMessage({
                type: 'error',
                content: err.response.data.error
              })
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
        setMessage({
          type: 'success',
          content: `Added ${newGuy.name}`
        })
        clearMessageAfter(3)
        setPersons(newPersons)
        // reset searcher after add new person
        setPersonsToShow(newPersons)
        clear()
      })
      .catch(err => {
        setMessage({
          type: 'error',
          content: err.response.data.error
        })
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
        message={message}
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
