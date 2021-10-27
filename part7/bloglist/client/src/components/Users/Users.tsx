import { useSelector } from 'react-redux'

import { RootState } from '../../store'

import { Loading } from '../Loading'

const Users = (): JSX.Element => {
  const users = useSelector((state: RootState) => state.users.users)
  const isLoading = useSelector((state: RootState) => state.users.loading)

  return (
    <>
      <h1>Users</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Blogs created</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogs?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export { Users }
