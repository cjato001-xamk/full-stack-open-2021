import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import { RootState } from '../../store'

import { Notification } from './Notification'

const mockState: RootState = {
  notification: {
    notifications: [
      {
        message: 'test-message',
        type: 'success',
      },
    ],
  },
}

describe('Notification component', () => {
  let spyOnUseSelector
  let spyOnUseDispatch

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector')
    spyOnUseSelector.mockReturnValue(mockState.notification.notifications[0])

    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
    spyOnUseDispatch.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders a notification', () => {
    render(<Notification />)

    expect(
      screen.getByText(`${mockState.notification.notifications[0].message}`)
    ).toBeInTheDocument()
  })
})
