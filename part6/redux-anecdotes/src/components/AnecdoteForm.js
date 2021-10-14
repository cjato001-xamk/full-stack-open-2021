import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const [anecdote, setAnecdote] = useState('')

  const addAnecdoteHandler = async (event) => {
    event.preventDefault()

    dispatch(addAnecdote(anecdote))
    dispatch(
      addNotification({
        type: 'success',
        message: `New anecdote "${anecdote}" added!`,
        timeout: 3,
      })
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
