import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import { CreateBlog } from './CreateBlog'

describe('CreateBlog component', () => {
  let spyOnUseSelector
  let spyOnUseDispatch

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector')
    spyOnUseSelector.mockImplementation((callback) =>
      callback({ blogs: { creating: false } })
    )

    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
    spyOnUseDispatch.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render', () => {
    render(<CreateBlog setShowCreateBlog={jest.fn()} />)

    expect(screen.getByText('Create new blog')).toBeInTheDocument()
  })
})
