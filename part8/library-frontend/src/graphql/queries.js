import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      authorId
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      bookId
      title
      author {
        authorId
        name
      }
      published
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS }
