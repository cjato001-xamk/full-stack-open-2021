import { gql } from '@apollo/client'

const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      bookId
      title
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($authorId: String!, $setBornTo: Int!) {
    editAuthor(authorId: $authorId, setBornTo: $setBornTo) {
      authorId
      name
    }
  }
`

export { ADD_BOOK, EDIT_AUTHOR }
