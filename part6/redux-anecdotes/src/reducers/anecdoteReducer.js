import { anecdoteService } from '../services/anecdoteService'

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('anecdoteReducer called')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const updatedAnecdote = action.data.anecdote

      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
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
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: { anecdote: updatedAnecdote },
    })
  }
}

const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: { anecdote: newAnecdote },
    })
  }
}

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export { anecdoteReducer, vote, initialState, addAnecdote, initializeAnecdotes }
