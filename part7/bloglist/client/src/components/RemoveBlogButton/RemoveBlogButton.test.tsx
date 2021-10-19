import { render, screen } from '@testing-library/react'

import { RemoveBlogButton } from './RemoveBlogButton'

describe('RemoveBlogButton component', () => {
  it('should render', () => {
    const mockBlog = {
      id: 'test-id',
      title: 'test-title',
      author: 'test-author',
      url: '',
      likes: 0,
      user: {
        id: '',
        username: '',
        name: '',
      },
    }

    render(
      <RemoveBlogButton
        blog={mockBlog}
        setNotification={jest.fn()}
        refreshBlogs={jest.fn()}
      />
    )

    expect(screen.getByText('Remove')).toBeInTheDocument()
  })
})
