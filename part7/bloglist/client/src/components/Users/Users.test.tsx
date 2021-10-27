import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import { Users } from './Users'

describe('Users component', () => {
  let spyOnUseSelector

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector')
    spyOnUseSelector.mockReturnValue([])
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render', () => {
    render(<Users />)

    expect(screen.getByText('Users')).toBeInTheDocument()
  })
})
