import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../graphql/queries'

import { Loading } from './Loading'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  if (!props.show) {
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
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { Authors }
