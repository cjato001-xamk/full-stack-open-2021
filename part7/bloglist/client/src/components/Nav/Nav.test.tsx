import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Nav } from './Nav'

describe('Nav component', () => {
  it('renders nav', () => {
    render(
      <Router>
        <Nav />
      </Router>
    )

    expect(screen.getByText('Blogs')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
  })
})
