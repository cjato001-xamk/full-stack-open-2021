import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { counterReducer } from './reducer'

const store = createStore(counterReducer)

const Button = ({ text, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({ text, value, suffix }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {suffix}
      </td>
    </tr>
  )
}

const App = () => {
  const dispatch = (type) => {
    store.dispatch({
      type,
    })
  }

  const total =
    store.getState().good + store.getState().neutral + store.getState().bad
  const average = (
    (store.getState().good - store.getState().bad) /
    total
  ).toFixed(2)
  const positive = ((store.getState().good / total) * 100).toFixed(2)

  return (
    <div>
      <h1>Unicafe Feedback</h1>

      <Button text='good' onClick={() => dispatch('GOOD')} />
      <Button text='neutral' onClick={() => dispatch('NEUTRAL')} />
      <Button text='bad' onClick={() => dispatch('BAD')} />
      <Button text='reset' onClick={() => dispatch('RESET')} />

      {total > 0 ? (
        <>
          <h1>Statistics</h1>

          <table>
            <tbody>
              <StatisticLine text='Good' value={store.getState().good} />
              <StatisticLine text='Neutral' value={store.getState().neutral} />
              <StatisticLine text='Bad' value={store.getState().bad} />
              <StatisticLine text='Total' value={total} />
              <StatisticLine text='Average' value={average} />
              <StatisticLine text='Positive' value={positive} suffix='%' />
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p>No feedback given.</p>
        </>
      )}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
