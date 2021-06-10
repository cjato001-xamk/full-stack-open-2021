import React, { useState } from 'react'

const Button = ({
  text,
  onClick,
}: {
  text: string
  onClick: React.MouseEventHandler<HTMLElement>
}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Statistics = ({
  good,
  neutral,
  bad,
}: {
  good: number
  neutral: number
  bad: number
}) => {
  const total = good + neutral + bad
  const average = ((good - bad) / total).toFixed(2)
  const positive = ((good / total) * 100).toFixed(2)

  return (
    <>
      {total > 0 ? (
        <>
          <h1>Statistics</h1>

          <table>
            <tbody>
              <StatisticLine text="Good" value={good} />
              <StatisticLine text="Neutral" value={neutral} />
              <StatisticLine text="Bad" value={bad} />
              <StatisticLine text="Total" value={total} />
              <StatisticLine text="Average" value={average} />
              <StatisticLine text="Positive" value={positive} suffix="%" />
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p>No feedback given.</p>
        </>
      )}
    </>
  )
}

const StatisticLine = ({
  text,
  value,
  suffix,
}: {
  text: string
  value: number | string
  suffix?: string
}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {suffix}
      </td>
    </tr>
  )
}

const App = (): JSX.Element => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Unicafe Feedback</h1>

      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export { App }
