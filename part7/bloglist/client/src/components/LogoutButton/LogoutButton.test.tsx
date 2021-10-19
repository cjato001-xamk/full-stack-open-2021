import { render, screen } from '@testing-library/react'

import { LogoutButton } from './LogoutButton'

describe('LogoutButton component', () => {
  it('should render', () => {
    render(<LogoutButton setUser={jest.fn()} />)

    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})
