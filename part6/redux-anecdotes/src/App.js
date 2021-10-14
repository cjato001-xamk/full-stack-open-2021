import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Notification } from './components/Notification'
import { Filter } from './components/Filter'
import { AnecdoteList } from './components/AnecdoteList'
import { AnecdoteForm } from './components/AnecdoteForm'
import { anecdoteService } from './services/anecdoteService'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>

      <Notification />

      <Filter />

      <AnecdoteList />

      <AnecdoteForm />
    </div>
  )
}

export { App }
