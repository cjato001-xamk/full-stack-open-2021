import { render, screen } from '@testing-library/react'
import { Blogs } from './Blogs'

describe('Blogs component', () => {
  it('should show as loading state', () => {
    render(<Blogs setNotification={jest.fn()} />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
