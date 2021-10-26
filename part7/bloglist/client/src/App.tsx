import './App.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authService } from './services/auth'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { RootState } from './store'

import { Blogs } from './components/Blogs'
import { Login } from './components/Login'
import { LogoutButton } from './components/LogoutButton'
import { Notification } from './components/Notification'

const App = (): JSX.Element => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.users.loggedInUser)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    // Check if local storage has user
    if (!user && authService.getUser() !== undefined) {
      dispatch(login({ user: authService.getUser() }))
    }
  }, [dispatch, user])

  const logoutHandler = (): void => {
    dispatch(logout())
  }

  return (
    <div>
      <Notification />

      {!user ? (
        <Login />
      ) : (
        <>
          <p>
            You are logged in as {user.name}.{' '}
            <LogoutButton logout={logoutHandler} />
          </p>

          <Blogs />
        </>
      )}
    </div>
  )
}

export { App }
