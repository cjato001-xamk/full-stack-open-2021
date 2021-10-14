const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('anecdoteReducer called')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const affectedAnecdote = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = {
        ...affectedAnecdote,
        votes: affectedAnecdote.votes + 1,
      }

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )

    case 'ADD_ANECDOTE':
      console.log('adding', action.data)
      return [...state, action.data.anecdote]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      console.log('type did not match', action.type)
      return state
  }
}

const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

const addAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    data: { anecdote },
  }
}

const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export { anecdoteReducer, vote, initialState, addAnecdote, initializeAnecdotes }
