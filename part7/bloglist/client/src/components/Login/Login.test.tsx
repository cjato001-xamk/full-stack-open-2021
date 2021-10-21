import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import { Login } from './Login'

describe('Login', () => {
  let spyOnUseDispatch

  beforeEach(() => {
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
    spyOnUseDispatch.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should have login form', () => {
    render(<Login setUser={jest.fn()} />)

    expect(screen.getByRole('heading')).toHaveTextContent('Login')
    expect(screen.getByRole('button')).toHaveTextContent('Login')
  })
})
