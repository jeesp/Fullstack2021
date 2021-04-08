import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Name from './components/Name'
import Error from './components/Error'
import Number from './components/Number'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setErrorMessage] = useState(null)
  const hook = () => {
    console.log('effect')
    personService.getAll()
    .then(personObjects => {
      setPersons(personObjects)
    })
  }
  
  useEffect(hook, [])
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (personCheck(persons, newName)) {
      if (window.confirm(`${newName} is already added to phonebook, do you want to replace old number with new one??`)) {
        const person =persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber}
        personService.update(person.id, changedPerson)
        .then(changed => {
          setPersons(persons.map(p => p.id !== person.id ? p : changed))
          setNewName('')
          setNewNumber('')
          setNotification(
            `changed number for ${newName}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
            
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== newName))
        })
      }
    }
    else {
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      })
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const personCheck = (persons, name) => {
    return (persons.map(person => person.name).includes(name))
  }
  const deletePerson = ({person}) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      console.log(person)
      personService.deleteNumber(person.id)
      .then(() => {
        setPersons(persons.filter(personInList => personInList.id !== person.id))
        setNotification(
          `${person.name} deleted`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from server`
        )
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter onChange={handleFilterChange}/>
      <form onSubmit={addPerson}>

        <h2> add a new</h2>
        <Name name={newName} onChange={handleNameChange}/>
        <Number number={newNumber} onChange={handleNumberChange} />
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
          <Person key={person.name} person={person} delPerson={deletePerson}/>
        )}
    </div>
  )

}

export default App