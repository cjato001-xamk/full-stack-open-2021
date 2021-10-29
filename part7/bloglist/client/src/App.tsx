import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import { authService } from './services/auth'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { login } from './reducers/userReducer'
import { RootState } from './store'

import { Navigation } from './components/Navigation'
import { Blogs } from './components/Blogs'
import { Blog } from './components/Blog'
import { Login } from './components/Login'
import { Notification } from './components/Notification'
import { Users } from './components/Users'
import { User } from './components/User'

const App = (): JSX.Element => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.users.loggedInUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    // Check if local storage has user
    if (!user && authService.getUser() !== undefined) {
      dispatch(login({ user: authService.getUser() }))
    }
  }, [dispatch, user])

  return (
    <div className='container'>
      <Notification />

      {!user ? (
        <Login />
      ) : (
        <>
          <Navigation />

          <Switch>
            <Route path='/users/:id'>
              <User />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/blogs/:id'>
              <Blog />
            </Route>
            <Route path='/'>
              <Blogs />
            </Route>
          </Switch>
        </>
      )}
    </div>
  )
}

export { App }
