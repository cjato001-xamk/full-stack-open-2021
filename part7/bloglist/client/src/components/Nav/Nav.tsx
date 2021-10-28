import { Link } from 'react-router-dom'

const Nav = (): JSX.Element => {
  return (
    <>
      <Link to='/'>Blogs</Link>
      <Link to='/users'>Users</Link>
    </>
  )
}

export { Nav }
