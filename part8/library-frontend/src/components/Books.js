import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS, ALL_GENRES } from '../graphql/queries'

import { Loading } from './Loading'
import { GenreSelector } from './GenreSelector'

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [books, setBooks] = useState()

  const genres = useQuery(ALL_GENRES)
  const [getBooks, { data: booksData, loading: loadingBooks }] =
    useLazyQuery(ALL_BOOKS)

  // Handles initial loading of all books
  useEffect(() => {
    getBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setBooks(booksData ? booksData.allBooks : [])
  }, [booksData])

  useEffect(() => {
    getBooks({ variables: { genre: selectedGenre } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre])

  if (!show) {
    return null
  }

  if (loadingBooks) {
    return <Loading />
  }

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && (
        <p>
          in genre <span style={{ fontWeight: 'bolder' }}>{selectedGenre}</span>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.data?.allGenres && (
        <GenreSelector
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          genres={genres.data.allGenres}
        />
      )}
    </div>
  )
}

export { Books }
