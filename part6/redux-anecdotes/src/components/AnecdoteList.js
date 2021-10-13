import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter.text)
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) => anecdote.content.includes(filter))
      .sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const voteHandler = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(addNotification({ type: 'success', message: 'Vote registered!' }))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export { AnecdoteList }
