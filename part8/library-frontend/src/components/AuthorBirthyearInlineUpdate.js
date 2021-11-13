import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../graphql/mutations'
import { ALL_AUTHORS } from '../graphql/queries'

const AuthorBirthyearInlineUpdate = ({ author }) => {
  const [born, setBornTo] = useState('')
  const [error, setError] = useState(false)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    if (/[1-2][0-9]{3}/.test(born)) {
      editAuthor({
        variables: { authorId: author.authorId, setBornTo: parseInt(born) },
      })
    } else {
      setError(true)
    }
  }

  return (
    <input
      value={born}
      onChange={({ target }) => setBornTo(target.value)}
      onBlur={submit}
      style={{
        width: 30,
        color: error ? 'red' : 'black',
      }}
    />
  )
}

export { AuthorBirthyearInlineUpdate }
