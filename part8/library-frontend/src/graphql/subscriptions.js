import { gql } from '@apollo/client'

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      bookId
      title
      author {
        authorId
        name
      }
      published
      genres
    }
  }
`

export { BOOK_ADDED }
