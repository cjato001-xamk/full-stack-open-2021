import { IAnecdote } from '../interfaces/IAnecdote'

type AnecdoteListProps = {
  anecdotes: IAnecdote[]
}

const AnecdoteList = ({ anecdotes }: AnecdoteListProps) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  </div>
)

export { AnecdoteList }
