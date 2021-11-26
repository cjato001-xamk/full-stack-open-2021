import { useEffect } from 'react'
import { useSubscription } from '@apollo/client'

import { BOOK_ADDED } from '../graphql/subscriptions'

const NotifyNewBooks = ({ setPage }) => {
  const { data, loading, error } = useSubscription(BOOK_ADDED)

  useEffect(() => {
    console.log(data, loading, error)
  }, [data, loading, error])

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
