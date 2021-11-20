import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../graphql/queries'

import { Loading } from './Loading'

const Books = ({ show }) => {
  const books = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (books.loading) {
    return <Loading />
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data?.allBooks.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Books }
