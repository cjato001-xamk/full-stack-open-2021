import { IAnecdote } from '../interfaces/IAnecdote'

type AnecdoteProps = {
  anecdote: IAnecdote
}

const Anecdote = ({ anecdote }: AnecdoteProps) => {
  return (
    <>
      <h3>{anecdote.content}</h3>

      <p>has {anecdote.votes} votes</p>
    </>
  )
}

export { Anecdote }
