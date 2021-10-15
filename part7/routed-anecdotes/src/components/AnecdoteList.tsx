import { Link } from 'react-router-dom'

import { IAnecdote } from '../interfaces/IAnecdote'

type AnecdoteListProps = {
  anecdotes: IAnecdote[]
}

const AnecdoteList = ({ anecdotes }: AnecdoteListProps) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export { AnecdoteList }
