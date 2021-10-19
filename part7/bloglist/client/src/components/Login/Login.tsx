import { useState } from 'react'

import { IUser } from '../../interfaces/IUser'
import { INotification } from '../../interfaces/INotification'
import { authService } from '../../services/auth'

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const Login = ({ setUser, setNotification }: LoginProps): JSX.Element => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false)

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setIsLoggingIn(true)

    authService
      .login({
        username,
        password,
      })
      .then((response) => {
        if (response.data.data) {
          setUsername('')
          setPassword('')

          authService.setUser(response.data.data)

          setIsLoggingIn(false)

          setUser(response.data.data)
        } else {
          setIsLoggingIn(false)
        }
      })
      .catch((error) => {
        setNotification({
          message: error?.response?.data?.error?.message || 'Failed to login.',
          type: 'error',
        })

        setIsLoggingIn(false)
      })
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
        <button type='submit' disabled={isLoggingIn}>
          {!isLoggingIn ? 'Login' : 'Logging in...'}
        </button>
      </form>
    </>
  )
}

export { Login }
