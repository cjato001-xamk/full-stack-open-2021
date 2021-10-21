import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import { Blogs } from './Blogs'

describe('Blogs component', () => {
  let spyOnUseDispatch

  beforeEach(() => {
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
    spyOnUseDispatch.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should show as loading state', () => {
    render(<Blogs />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
