import { render, screen } from '@testing-library/react'

import { Notification } from './Notification'

describe('Notification component', () => {
  it('renders a notification', () => {
    const mockNotification = {
      message: 'test-message',
      type: 'test-type',
    }

    render(
      <Notification
        notification={mockNotification}
        setNotification={jest.fn()}
      />
    )

    expect(screen.getByText(`${mockNotification.message}`)).toBeInTheDocument()
  })
})
