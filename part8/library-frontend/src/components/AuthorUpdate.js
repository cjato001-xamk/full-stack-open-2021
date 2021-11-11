import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../graphql/mutations'
import { ALL_AUTHORS } from '../graphql/queries'

const AuthorUpdate = () => {
  const [name, setName] = useState('')
  const [born, setBornTo] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name, setBornTo: parseInt(born) },
    })

    setName('')
    setBornTo('')
  }

  return (
    <>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBornTo(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export { AuthorUpdate }
