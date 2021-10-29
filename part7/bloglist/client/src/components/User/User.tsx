import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

import { RootState } from '../../store'

import { Loading } from '../Loading'
import { BlogList } from '../BlogList'

const User = (): JSX.Element => {
  const { id: userId } = useParams<{ id: string }>()

  const user = useSelector((state: RootState) => {
    return state.users.users.find((user) => user.id === userId)
  })
  const isLoading = useSelector((state: RootState) => {
    return state.users.loading
  })

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {user ? (
            <>
              <h1>{user.name}</h1>

              <h3>Added blogs</h3>

              <BlogList blogs={user.blogs} />
            </>
          ) : (
            <Alert variant='danger'>Invalid user</Alert>
          )}
        </>
      )}
    </>
  )
}

export { User }
