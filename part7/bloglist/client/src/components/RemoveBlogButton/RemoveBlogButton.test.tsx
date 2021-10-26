import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import { RemoveBlogButton } from './RemoveBlogButton'

describe('RemoveBlogButton component', () => {
  let spyOnUseSelector
  let spyOnUseDispatch

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector')
    spyOnUseSelector.mockReturnValue([])

    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
    spyOnUseDispatch.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

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

    render(<RemoveBlogButton blog={mockBlog} />)

    expect(screen.getByText('Remove')).toBeInTheDocument()
  })
})
