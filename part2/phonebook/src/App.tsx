import { useState, useEffect } from 'react'

import './App.css'

import { IPerson } from './interfaces/IPerson'
import { personService } from './services/personService'

import { Filter } from './components/Filter'
import { CreatePersonForm } from './components/CreatePersonForm'
import { Phonebook } from './components/Phonebook'
import { Notification } from './components/Notification'

const App = (): JSX.Element => {
  const [persons, setPersons] = useState<IPerson[]>([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    refreshPersons()
  }, [])

  const refreshPersons = (): void => {
    personService
      .getPersons()
      .then((persons) => {
        setPersons(persons)
      })
      .catch(() => {
        setNotification({
          message: 'Failed to fetch persons from database.',
          type: 'error',
        })
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setFilter={setFilter} />

      <h3>Add new person</h3>

      <CreatePersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNotification={setNotification}
        persons={persons}
        refreshPersons={refreshPersons}
      />

      <Notification
        notification={notification}
        setNotification={setNotification}
      />

      <h2>Numbers</h2>

      <Phonebook
        persons={persons}
        filter={filter}
        refreshPersons={refreshPersons}
        setNotification={setNotification}
      />
    </div>
  )
}

export { App }
