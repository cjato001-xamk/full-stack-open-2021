import './App.css'

import { useState, useEffect } from 'react'

import { IUser } from './interfaces/IUser'
import { INotification } from './interfaces/INotification'
import { authService } from './services/auth'

import { Blogs } from './components/Blogs'
import { Login } from './components/Login'
import { LogoutButton } from './components/LogoutButton'
import { Notification } from './components/Notification'

const App = (): JSX.Element => {
  const [user, setUser] = useState<IUser | null>(null)
  const [notification, setNotification] = useState<INotification>({
    message: '',
    type: '',
  })

  useEffect(() => {
    if (!user && authService.getUser() !== undefined) {
      setUser(authService.getUser())
    }
  }, [user])

  return (
    <div>
      <Notification
        notification={notification}
        setNotification={setNotification}
      />

      {!user ? (
        <Login setUser={setUser} setNotification={setNotification} />
      ) : (
        <>
          <p>
            You are logged in as {user.name}. <LogoutButton setUser={setUser} />
          </p>

          <Blogs setNotification={setNotification} />
        </>
      )}
    </div>
  )
}

export { App }
