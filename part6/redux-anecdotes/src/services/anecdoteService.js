import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

const vote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const newVotes = anecdote.data.votes ? (anecdote.data.votes += 1) : 1
  const updatedAnecdote = { ...anecdote.data, votes: newVotes }

  const update = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return update.data
}

const anecdoteService = {
  getAll,
  createNew,
  vote,
}

export { anecdoteService }
