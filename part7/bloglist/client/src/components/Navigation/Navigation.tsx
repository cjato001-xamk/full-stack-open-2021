import { Navbar, Nav, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { RootState } from '../../store'
import { logout } from '../../reducers/userReducer'

import { LogoutButton } from '../LogoutButton'

const Navigation = (): JSX.Element => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.users.loggedInUser)

  const logoutHandler = (): void => {
    dispatch(logout())
  }

  return (
    <Navbar>
      <Container>
        <Nav className='me-auto'>
          <LinkContainer to='/'>
            <Nav.Link>Blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/users'>
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            {user && <LogoutButton logout={logoutHandler} name={user.name} />}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export { Navigation }
