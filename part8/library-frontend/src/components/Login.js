import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../graphql/mutations'

const Login = ({ show, handleError, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      handleError(error.graphQLErrors)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      setPage('authors')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export { Login }
