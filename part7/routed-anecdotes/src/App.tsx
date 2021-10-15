import { useState } from 'react'

import { anecdotes as anecdoteData } from './data/anecdotes'
import { IAnecdote } from './interfaces/IAnecdote'

import { Layout } from './components/Layout'
import { AnecdoteList } from './components/AnecdoteList'
import { About } from './components/About'
import { CreateNew } from './components/CreateNew'

const App = () => {
  const [anecdotes, setAnecdotes] = useState<IAnecdote[]>(anecdoteData)

  const [notification, setNotification] = useState<string>('')

  const addNew = (anecdote: IAnecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id: string) => anecdotes.find((a) => a.id === id)

  // const vote = (id: string) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1,
  //   }

  //   setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Layout>
        <AnecdoteList anecdotes={anecdotes} />
        <About />
        <CreateNew addNew={addNew} />
      </Layout>
    </div>
  )
}

export { App }
