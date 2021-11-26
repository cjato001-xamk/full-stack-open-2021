import { useEffect } from 'react'
import { useApolloClient, useSubscription, useQuery } from '@apollo/client'
import _ from 'lodash'

import { ME, ALL_GENRES, ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries'
import { BOOK_ADDED } from '../graphql/subscriptions'

const NotifyNewBooks = ({ setPage }) => {
  const client = useApolloClient()
  const { data, loading, error } = useSubscription(BOOK_ADDED)

  const me = useQuery(ME)

  const updateCacheWith = (addedBook) => {
    const newBook = addedBook
    const genres = addedBook.genres || []
    const author = addedBook.author

    // Add new genres to cache
    const allGenresInStore = client.readQuery({ query: ALL_GENRES })
    const newGenres = _.difference(genres, allGenresInStore.allGenres)
    if (newGenres.length) {
      client.writeQuery({
        query: ALL_GENRES,
        data: { allGenres: allGenresInStore.allGenres.concat(newGenres) },
      })
    }

    // Add new author to cache or increase bookCount for an existing author
    const allAuthorsInStore = client.readQuery({ query: ALL_AUTHORS })
    const isNewAuthor = !allAuthorsInStore.allAuthors.some(
      (a) => a.authorId === author.authorId
    )
    if (isNewAuthor) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: allAuthorsInStore.allAuthors.concat({
            ...author,
            bookCount: 1,
            born: null,
          }),
        },
      })
    } else {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: allAuthorsInStore.allAuthors.map((a) =>
            a.authorId === author.authorId
              ? { ...a, bookCount: a.bookCount + 1 }
              : a
          ),
        },
      })
    }

    // Add new book to cache (must update cache for all genre variations)
    const bookQueriesToUpdateByGenres = ['', ...genres]
    if (me.data?.me.favoriteGenre) {
      bookQueriesToUpdateByGenres.push(me.data.me.favoriteGenre)
    }
    bookQueriesToUpdateByGenres.forEach((genre) => {
      const allBooksInStore = client.readQuery({
        query: ALL_BOOKS,
        variables: { genre },
      })
      // Query with variables exists in cache
      if (allBooksInStore) {
        const isNewBook = !allBooksInStore.allBooks.some(
          (book) => book.bookId === newBook.bookId
        )
        if (isNewBook) {
          client.writeQuery({
            query: ALL_BOOKS,
            variables: { genre },
            data: { allBooks: allBooksInStore.allBooks.concat(newBook) },
          })
        }
      }
    })
  }

  // Update cache
  useEffect(() => {
    if (!loading && !error) {
      updateCacheWith(data.bookAdded)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading])

  if (!data?.bookAdded?.title) {
    return null
  }

  return (
    <p>
      Newest book in library:{' '}
      <span
        onClick={() => setPage('books')}
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
      >
        "{data.bookAdded.title}"
      </span>{' '}
      by {data.bookAdded.author.name}.
    </p>
  )
}

export { NotifyNewBooks }
