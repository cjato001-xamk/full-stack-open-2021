import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('should have login form', () => {
    render(<App />)

    expect(screen.getByRole('heading')).toHaveTextContent('Login')
    expect(screen.getByRole('button')).toHaveTextContent('Login')
  })
})
