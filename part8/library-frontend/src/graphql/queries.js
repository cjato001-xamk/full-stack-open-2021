import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      published
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS }
