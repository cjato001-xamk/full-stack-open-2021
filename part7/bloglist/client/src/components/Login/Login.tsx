import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import { login } from '../../reducers/userReducer'

const Login = (): JSX.Element => {
  const dispatch = useDispatch()
  const authInProgress = useSelector(
    (state: RootState) => state.users.authInProgress
  )

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    dispatch(login({ username, password }))
  }

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }): void => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type='password'
            value={password}
            name='password'
            onChange={({ target }): void => setPassword(target.value)}
          />
        </div>
        <button type='submit' disabled={authInProgress}>
          {!authInProgress ? 'Login' : 'Logging in...'}
        </button>
      </form>
    </>
  )
}

export { Login }
