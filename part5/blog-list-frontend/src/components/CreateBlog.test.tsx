import { render, screen } from '@testing-library/react'
import { CreateBlog } from './CreateBlog'

describe('Loading component', () => {
  it('should render', () => {
    render(
      <CreateBlog
        refreshBlogs={jest.fn()}
        setNotification={jest.fn()}
        setShowCreateBlog={jest.fn()}
      />
    )

    expect(screen.getByText('Create new blog')).toBeInTheDocument()
  })
})
