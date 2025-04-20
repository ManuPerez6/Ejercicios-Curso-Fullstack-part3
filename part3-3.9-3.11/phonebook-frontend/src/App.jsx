/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './App.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const alreadyExists = (name) => {
    return persons.some(person => person.name === name)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (alreadyExists(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      phonebookService
        .create(newPerson) 
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) 
          setNewName('')
          setNewNumber('')
          setAddedMessage(`${returnedPerson.name} was added to the phonebook`)
          setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error adding person:', error)
          alert('Failed to add the person. Please try again.')
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          alert('Failed to delete the person. Please try again.')
        })
    }
  }

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  )
}

export default App
