import { authService } from '../services/auth'
import { IUser } from '../interfaces/IUser'

type LogoutButtonProps = {
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const LogoutButton = ({ setUser }: LogoutButtonProps): JSX.Element => {
  const logout = (): void => {
    authService.logout()
    setUser(null)
  }
  return <button onClick={logout}>Logout</button>
}

export { LogoutButton }
