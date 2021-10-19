import { render, screen, fireEvent } from '@testing-library/react'
import { LikeButton } from './LikeButton'

describe('LikeButton component', () => {
  it('should render', () => {
    render(<LikeButton like={jest.fn()} isLiking={false} />)

    expect(screen.getByText('Like')).toBeInTheDocument()
  })

  it('should call like-function when Like-button clicked', () => {
    const mockLike = jest.fn()

    render(<LikeButton like={mockLike} isLiking={false} />)

    fireEvent.click(screen.getByText('Like'))

    expect(mockLike.mock.calls).toHaveLength(1)
  })

  it('should call like-function as many times as Like-button clicked', () => {
    const mockLike = jest.fn()

    render(<LikeButton like={mockLike} isLiking={false} />)

    fireEvent.click(screen.getByText('Like'))
    fireEvent.click(screen.getByText('Like'))

    expect(mockLike.mock.calls).toHaveLength(2)
  })
})
