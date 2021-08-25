import { render, screen } from '@testing-library/react'
import { CreateBlog } from './CreateBlog'

describe('Loading component', () => {
  it('should render', () => {
    render(<CreateBlog />)

    expect(screen.getByText('Create new blog')).toBeInTheDocument()
  })
})
