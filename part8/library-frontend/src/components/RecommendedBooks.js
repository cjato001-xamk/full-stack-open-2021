import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ME, ALL_BOOKS } from '../graphql/queries'

import { Loading } from './Loading'
import { BooksTable } from './BooksTable'

const RecommendedBooks = ({ show, handleError }) => {
  const [books, setBooks] = useState()

  const me = useQuery(ME)
  const [getBooks, { data: booksData, loading: loadingBooks }] =
    useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (me.data?.me.favoriteGenre) {
      getBooks({ variables: { genre: me.data.me.favoriteGenre } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me])

  useEffect(() => {
    setBooks(booksData ? booksData.allBooks : [])
  }, [booksData])

  if (!show) {
    return null
  }

  if (me.loading) {
    return <Loading />
  }

  return (
    <div>
      <h2>Recommended books</h2>

      {me.data?.me.favoriteGenre ? (
        <>
          <p>
            Books available in your favorite genre {me.data.me.favoriteGenre}
          </p>

          {loadingBooks ? <Loading /> : <BooksTable books={books} />}
        </>
      ) : (
        <p>Et ole määrittänyt suosikkigenreäsi.</p>
      )}
    </div>
  )
}

export { RecommendedBooks }
