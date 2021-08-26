import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'

describe('Blog component', () => {
  it('renders a blog', () => {
    const mockBlog = {
      id: 'test-id',
      title: 'test-title',
      author: 'test-author',
      url: '',
      likes: 0,
      user: {
        username: '',
        name: '',
      },
    }
    render(
      <Blog
        blog={mockBlog}
        setNotification={jest.fn()}
        refreshBlogs={jest.fn()}
      />
    )

    expect(
      screen.getByText(`${mockBlog.title} ${mockBlog.author}`)
    ).toBeInTheDocument()
  })
})
