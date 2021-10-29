import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import * as redux from 'react-redux'

import { Navigation } from './Navigation'

describe('Navigation component', () => {
  let spyOnUseSelector
  let spyOnUseDispatch

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector')
    spyOnUseSelector.mockImplementation((callback) =>
      callback({ users: { loggedInUser: { name: 'Janne' } } })
    )

    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
    spyOnUseDispatch.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders navigation', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )

    expect(screen.getByText('Blogs')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
  })
})
