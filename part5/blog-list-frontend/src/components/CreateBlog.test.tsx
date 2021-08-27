import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { blogService } from '../services/blogs'

import { CreateBlog } from './CreateBlog'

jest.mock('../services/blogs', () => {
  const original = jest.requireActual('../services/blogs')
  return {
    ...original,
    blogService: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      create: (value: any): any => Promise.resolve(value),
    },
  }
})

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

  it('should call blogService with correct form data', async () => {
    const spy = jest.spyOn(blogService, 'create')

    const { container } = render(
      <CreateBlog
        refreshBlogs={jest.fn()}
        setNotification={jest.fn()}
        setShowCreateBlog={jest.fn()}
      />
    )

    fireEvent.change(
      container.querySelector('input[name="title"]') as HTMLInputElement,
      {
        target: { value: 'test-title' },
      }
    )

    fireEvent.change(
      container.querySelector('input[name="author"]') as HTMLInputElement,
      {
        target: { value: 'test-author' },
      }
    )

    fireEvent.change(
      container.querySelector('input[name="url"]') as HTMLInputElement,
      {
        target: { value: 'test-url' },
      }
    )

    fireEvent.click(screen.getByText('Create'))

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith({
        author: 'test-author',
        title: 'test-title',
        url: 'test-url',
      })
    })
  })
})
