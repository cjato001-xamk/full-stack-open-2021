import { queryByText, render, screen, fireEvent } from '@testing-library/react'
import * as redux from 'react-redux'

import { IBlog } from '../../interfaces/IBlog'

import { Blog } from './Blog'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: (): any => ({
    id: '123',
  }),
}))

const mockState = {
  blogs: {
    blogs: [
      {
        id: '123',
        title: 'test-title',
        author: 'test-author',
        url: 'test-url',
        likes: 42,
        user: {
          id: '321',
          username: '',
          name: 'Tester',
        },
      },
    ],
    liking: [],
    removing: [],
    commenting: [],
  },
  users: {
    loggedInUser: {
      id: '321',
    },
  },
}

describe('Blog component', () => {
  let spyOnUseSelector
  let spyOnUseDispatch

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(redux, 'useSelector')
    spyOnUseSelector.mockImplementation((callback) => callback(mockState))

    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
    spyOnUseDispatch.mockReturnValue(jest.fn())

    render(<Blog />)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders a blog with details', () => {
    expect(
      screen.getByText(
        `${mockState.blogs.blogs[0].title} ${mockState.blogs.blogs[0].author}`
      )
    ).toBeInTheDocument()

    expect(screen.getByText(mockState.blogs.blogs[0].url)).toBeInTheDocument()

    expect(
      screen.getByText(`Likes: ${mockState.blogs.blogs[0].likes}`)
    ).toBeInTheDocument()

    expect(
      screen.getByText(`added by ${mockState.blogs.blogs[0].user.name}`)
    ).toBeInTheDocument()
  })
})
