import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'

describe('Blog component', () => {
  it('renders a blog', () => {
    const mockBlog = {
      title: 'test-title',
      author: 'test-author',
      url: '',
      likes: 0,
      user: '',
    }
    render(<Blog blog={mockBlog} />)

    expect(
      screen.getByText(`${mockBlog.title} ${mockBlog.author}`)
    ).toBeInTheDocument()
  })
})
