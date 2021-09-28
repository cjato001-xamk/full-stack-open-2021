import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const [anecdote, setAnecdote] = useState('')

  const addAnecdoteHandler = (event) => {
    event.preventDefault()

    dispatch(addAnecdote(anecdote))

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
