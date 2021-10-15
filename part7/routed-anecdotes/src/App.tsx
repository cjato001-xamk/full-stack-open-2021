import { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import { anecdotes as anecdoteData } from './data/anecdotes'
import { IAnecdote } from './interfaces/IAnecdote'

import { Layout } from './components/Layout'
import { Anecdote } from './components/Anecdote'
import { AnecdoteList } from './components/AnecdoteList'
import { About } from './components/About'
import { CreateNew } from './components/CreateNew'
import { E400 } from './components/E400'

const App = () => {
  const history = useHistory()

  const [anecdotes, setAnecdotes] = useState<IAnecdote[]>(anecdoteData)

  const match: any = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null

  const [notification, setNotification] = useState<string>('')

  const addNew = (anecdote: IAnecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    history.push('/')
    setNotification(`a new anecdote ${anecdote.content} created!`)
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

      <Layout notification={notification}>
        <Switch>
          <Route path='/anecdotes/:id'>
            {anecdote && <Anecdote anecdote={anecdote} />}
            {!anecdote && <E400 />}
          </Route>
          <Route path='/create'>
            <CreateNew addNew={addNew} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Layout>
    </div>
  )
}

export { App }
