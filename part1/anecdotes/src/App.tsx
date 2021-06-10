import { useState, useEffect } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
]

const Anecdote = ({ anecdote }: { anecdote: number }) => {
  return <div>{anecdotes[anecdote]}</div>
}

const VoteCount = ({ votes }: { votes: number }) => {
  return <p>Has {votes} votes.</p>
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  })
  const [winner, setWinner] = useState<number | null>(null)

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    setVotes({
      ...votes,
      [selected]: votes[selected] ? votes[selected] + 1 : 1,
    })
  }

  useEffect(() => {
    setWinner(
      parseInt(Object.entries(votes).reduce((a, b) => (a[1] > b[1] ? a : b))[0])
    )
  }, [votes])

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={selected} />
      <VoteCount votes={votes[selected]} />
      <button onClick={vote}>Vote</button>
      <button onClick={randomAnecdote}>Next anecdote</button>

      {winner !== null && votes[winner] !== 0 && (
        <>
          <h1>Anecdote with most votes</h1>
          <Anecdote anecdote={winner} />
          <VoteCount votes={votes[winner]} />
        </>
      )}
    </>
  )
}

export { App }
