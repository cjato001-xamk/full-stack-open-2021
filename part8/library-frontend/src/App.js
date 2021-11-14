import React, { useState } from 'react'

import { Authors } from './components/Authors'
import { Books } from './components/Books'
import { NewBook } from './components/NewBook'

import { ErrorHandler } from './components/ErrorHandler'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errors, setErrors] = useState([])

  const handleError = (error) => {
    setErrors(error)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {errors.length !== 0 && <ErrorHandler errors={errors} />}

      <Authors show={page === 'authors'} handleError={handleError} />

      <Books show={page === 'books'} handleError={handleError} />

      <NewBook show={page === 'add'} handleError={handleError} />
    </div>
  )
}

export { App }
