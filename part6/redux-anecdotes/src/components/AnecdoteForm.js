import React, { useState } from 'react'
import { connect } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const [anecdote, setAnecdote] = useState('')

  const addAnecdoteHandler = async (event) => {
    event.preventDefault()

    props.addAnecdote(anecdote)
    props.addNotification({
      type: 'success',
      message: `New anecdote "${anecdote}" added!`,
      timeout: 3,
    })

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

const mapDispatchToProps = {
  addAnecdote,
  addNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export { ConnectedAnecdoteForm as AnecdoteForm }
