import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { anecdoteService } from '../services/anecdoteService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const [anecdote, setAnecdote] = useState('')

  const addAnecdoteHandler = async (event) => {
    event.preventDefault()

    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(addAnecdote(newAnecdote))
    dispatch(
      addNotification({ type: 'success', message: 'New anecdote added!' })
    )

    setAnecdote('')
  }

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={addAnecdoteHandler}>
        <div>
          <input
            value={anecdote}
            onChange={(event) => {
              setAnecdote(event.target.value)
            }}
          />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export { AnecdoteForm }
