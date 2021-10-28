import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import { User } from './User'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: (): any => ({
    id: '123',
  }),
}))

const mockState = {
  users: {
    loading: false,
    users: [],
  },
}

describe('User component', () => {
  let spyOnUseSelector

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector')
    spyOnUseSelector.mockImplementation((callback: any) => callback(mockState))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should fail on invalid user', () => {
    render(<User />)

    expect(screen.getByText('Invalid user')).toBeInTheDocument()
  })
})
