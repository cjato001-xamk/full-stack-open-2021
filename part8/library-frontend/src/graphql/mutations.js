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
      author {
        authorId
        name
        born
      }
      published
      genres
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export { ADD_BOOK, EDIT_AUTHOR, LOGIN }
