import { queryByText, render, screen, fireEvent } from '@testing-library/react'
import { IBlog } from '../interfaces/IBlog'
import { Blog } from './Blog'

describe('Blog component', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let container: any
  let mockBlog: IBlog

  beforeEach(() => {
    mockBlog = {
      id: 'test-id',
      title: 'test-title',
      author: 'test-author',
      url: 'test-url',
      likes: 42,
      user: {
        id: '',
        username: '',
        name: '',
      },
    }
    ;({ container } = render(
      <Blog
        blog={mockBlog}
        setNotification={jest.fn()}
        refreshBlogs={jest.fn()}
      />
    ))
  })

  it('renders a blog without details', () => {
    expect(
      screen.getByText(`${mockBlog.title} ${mockBlog.author}`)
    ).toBeInTheDocument()
    expect(queryByText(container, mockBlog.url)).toBeFalsy()
    expect(queryByText(container, mockBlog.likes)).toBeFalsy()
  })

  it('renders a blog with details after button clicked', () => {
    expect(
      screen.getByText(`${mockBlog.title} ${mockBlog.author}`)
    ).toBeInTheDocument()
    expect(queryByText(container, mockBlog.url)).toBeFalsy()
    expect(queryByText(container, mockBlog.likes)).toBeFalsy()

    fireEvent.click(screen.getByText('Show details'))

    expect(
      screen.getByText(`${mockBlog.title} ${mockBlog.author}`)
    ).toBeInTheDocument()
    expect(screen.getByText(mockBlog.url)).toBeInTheDocument()
    expect(screen.getByText(`Likes: ${mockBlog.likes}`)).toBeInTheDocument()
  })
})
