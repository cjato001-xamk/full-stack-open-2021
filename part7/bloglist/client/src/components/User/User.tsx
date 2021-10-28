import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { RootState } from '../../store'
import { IBlog } from '../../interfaces/IBlog'

import { Loading } from '../Loading'

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

              <h2>Added blogs</h2>

              <ul>
                {user.blogs?.map(
                  (blog: Pick<IBlog, 'id' | 'title' | 'url' | 'author'>) => (
                    <li key={blog.id}>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </li>
                  )
                )}
              </ul>
            </>
          ) : (
            <h1>Invalid user</h1>
          )}
        </>
      )}
    </>
  )
}

export { User }
