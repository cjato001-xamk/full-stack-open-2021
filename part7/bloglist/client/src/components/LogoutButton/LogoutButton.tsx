type LogoutButtonProps = {
  logout: () => void
}

const LogoutButton = ({ logout }: LogoutButtonProps): JSX.Element => {
  return <button onClick={(): void => logout()}>Logout</button>
}

export { LogoutButton }
