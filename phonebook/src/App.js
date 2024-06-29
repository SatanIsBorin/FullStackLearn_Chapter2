import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [info, setInfo] = useState({ message: null})

  useEffect(() => {
    personService.getAll().then((initialPersons => 
      setPersons(initialPersons)
    ))
  }, [])

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null} )
    }, 3000)
  }

  const cleanForm = () => {
    setNewName('')
    setNewNumber('') 
  }

  const updatePerson = (person) => {
    const ok = window.confirm(`${newName} is already added to phonebook, replace the number?`)

    if (ok) {
      
      personService.update(person.id, {...person, number: newNumber}).then((updatedPerson) => {
        setPersons(persons.map(p => p.id !== person.id ? p :updatedPerson ))
        notifyWith(`phone number of ${person.name} updated!`)
      })
      .catch(() => {
        notifyWith(`${person.name} has already been removed`, 'error')
        setPersons(persons.filter(p => p.id !== person.id))
      })

      cleanForm()
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)
    if (found != undefined) {
      window.alert(`${newName} is already added to phonebook.`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
    personService.create({
      name: newName,
      number: newNumber
    }).then(createdPerson => {
      setPersons(persons.concat(createdPerson))

      notifyWith(`${createdPerson.name} added!`)

      cleanForm()
    })
  }

  const removePerson = (person) => {
    const ok = window.confirm(`remove ${person.name} from phonebook?`)
    if ( ok ) {
      personService.remove(person.id).then( () => {
        setPersons(persons.filter(p => p.id !== person.id))
        notifyWith(`number of ${person.name} deleted!`)
      })
    }
  }

  return (
    <div>
      <h2>Filter</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Phonebook</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App