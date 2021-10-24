import './App.css'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { IUser } from './interfaces/IUser'
import { authService } from './services/auth'
import { initializeBlogs } from './reducers/blogReducer'

import { Blogs } from './components/Blogs'
import { Login } from './components/Login'
import { LogoutButton } from './components/LogoutButton'
import { Notification } from './components/Notification'

const App = (): JSX.Element => {
  const dispatch = useDispatch()

  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    if (!user && authService.getUser() !== undefined) {
      setUser(authService.getUser())
    }
  }, [user])

  return (
    <div>
      <Notification />

      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <p>
            You are logged in as {user.name}. <LogoutButton setUser={setUser} />
          </p>

          <Blogs />
        </>
      )}
    </div>
  )
}

export { App }
