import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../graphql/queries'

import { Loading } from './Loading'
import { AuthorBirthyearInlineUpdate } from './AuthorBirthyearInlineUpdate'

const Authors = ({ show, handleError }) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (authors.loading) {
    return <Loading />
  }

  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((author) => (
            <tr key={author.authorId}>
              <td>{author.name}</td>
              <td>
                {author.born ? (
                  author.born
                ) : (
                  <AuthorBirthyearInlineUpdate
                    author={author}
                    handleError={handleError}
                  />
                )}
              </td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Authors }
