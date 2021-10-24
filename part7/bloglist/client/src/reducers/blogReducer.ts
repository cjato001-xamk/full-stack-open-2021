import { ThunkDispatch } from 'redux-thunk'

import { IBlog } from '../interfaces/IBlog'
import { blogService } from '../services/blogs'
import { RootState } from '../store'
import { addNotification } from './notificationReducer'

enum BlogsActionType {
  INIT_BLOGS = 'INIT_BLOGS',
  LOADING_BLOGS = 'LOADING_BLOGS',
}

interface BlogsState {
  blogs: IBlog[]
  loading: boolean
}

interface ILoadingBlogs {
  type: BlogsActionType.LOADING_BLOGS
  data: boolean
}

interface IInitializeBlogs {
  type: BlogsActionType.INIT_BLOGS
  data: IBlog[]
}

type BlogsActionInterfaces = ILoadingBlogs | IInitializeBlogs

const initialState: BlogsState = {
  blogs: [],
  loading: false,
}

const blogReducer = (
  state = initialState,
  action: BlogsActionInterfaces
): BlogsState => {
  switch (action.type) {
    case BlogsActionType.LOADING_BLOGS:
      return {
        ...state,
        loading: action.data,
      }

    case BlogsActionType.INIT_BLOGS:
      return {
        ...state,
        blogs: action.data,
      }

    default:
      return state
  }
}

const setLoadingBlogs = (loading: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, ILoadingBlogs>): void => {
    dispatch({
      type: BlogsActionType.LOADING_BLOGS,
      data: loading,
    })
  }
}

const initializeBlogs = () => {
  return async (
    dispatch: ThunkDispatch<RootState, void, IInitializeBlogs>
  ): Promise<void> => {
    dispatch(setLoadingBlogs(true))

    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: BlogsActionType.INIT_BLOGS,
        data: blogs.data?.data || [],
      })
    } catch {
      addNotification({ message: 'Failed to fetch blogs.', type: 'error' })
    }

    dispatch(setLoadingBlogs(false))
  }
}

export { blogReducer, initializeBlogs }
