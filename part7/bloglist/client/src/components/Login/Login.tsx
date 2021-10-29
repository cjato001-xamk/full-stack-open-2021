import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

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
      <h1 className='mt-4'>Login</h1>

      <Form onSubmit={handleLogin}>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            name='username'
            onChange={({ target }): void => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            name='password'
            onChange={({ target }): void => setPassword(target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' disabled={authInProgress}>
          {!authInProgress ? 'Login' : 'Logging in...'}
        </Button>
      </Form>
    </>
  )
}

export { Login }
