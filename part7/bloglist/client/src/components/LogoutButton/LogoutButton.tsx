import { Button } from 'react-bootstrap'

type LogoutButtonProps = {
  logout: () => void
  name: string
}

const LogoutButton = ({ logout, name }: LogoutButtonProps): JSX.Element => {
  return (
    <Button variant='link' onClick={(): void => logout()}>
      Logout {name}
    </Button>
  )
}

export { LogoutButton }
