import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const [anecdote, setAnecdote] = useState('')

  const addAnecdoteHandler = (event) => {
    event.preventDefault()

    dispatch(addAnecdote(anecdote))

    setAnecdote('')
  }

  return (
    <div>
      <h2>Anecdotes</h2>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}

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
    </div>
  )
}

export { App }
