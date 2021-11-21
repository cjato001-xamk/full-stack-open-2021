import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import { Authors } from './components/Authors'
import { Books } from './components/Books'
import { NewBook } from './components/NewBook'
import { RecommendedBooks } from './components/RecommendedBooks'
import { Login } from './components/Login'

import { ErrorHandler } from './components/ErrorHandler'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errors, setErrors] = useState([])
  const client = useApolloClient()

  const handleError = (error) => {
    setErrors(error)
  }

  // Check possible user token on initial load
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('user-token')

    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
      </div>

      {errors.length !== 0 && <ErrorHandler errors={errors} />}

      <Authors
        show={page === 'authors'}
        handleError={handleError}
        token={token}
      />

      <Books show={page === 'books'} handleError={handleError} />

      <NewBook
        show={page === 'add'}
        handleError={handleError}
        setPage={setPage}
      />

      <RecommendedBooks
        show={page === 'recommended'}
        handleError={handleError}
      />

      <Login
        show={page === 'login'}
        handleError={handleError}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export { App }
