import { render, screen } from '@testing-library/react'
import { Login } from './Login'

describe('Login', () => {
  it('should have login form', () => {
    render(<Login setUser={jest.fn()} setNotification={jest.fn()} />)

    expect(screen.getByRole('heading')).toHaveTextContent('Login')
    expect(screen.getByRole('button')).toHaveTextContent('Login')
  })
})
