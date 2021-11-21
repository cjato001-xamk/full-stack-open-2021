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
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
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

const ALL_GENRES = gql`
  query {
    allGenres
  }
`

const ME = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`

export { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, ME }
