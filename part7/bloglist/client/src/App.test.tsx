import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import { App } from './App'

describe('App', () => {
  let spyOnUseSelector
  let spyOnUseDispatch

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector')
    spyOnUseSelector.mockReturnValue([])

    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
    spyOnUseDispatch.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should have login form', () => {
    render(<App />)

    expect(screen.getByRole('heading')).toHaveTextContent('Login')
    expect(screen.getByRole('button')).toHaveTextContent('Login')
  })
})
