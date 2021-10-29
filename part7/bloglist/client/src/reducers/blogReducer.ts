import { ThunkDispatch } from 'redux-thunk'

import { IBlog } from '../interfaces/IBlog'
import { blogService } from '../services/blogs'
import { RootState } from '../store'
import { addNotification, IAddNotification } from './notificationReducer'

enum BlogsActionType {
  INIT_BLOGS = 'INIT_BLOGS',
  LOADING_BLOGS = 'LOADING_BLOGS',
  LIKE_BLOG = 'LIKE_BLOG',
  LIKING_BLOG = 'LIKING_BLOG',
  COMMENT_BLOG = 'COMMENT_BLOG',
  COMMENTING_BLOG = 'COMMENTING_BLOG',
  REMOVE_BLOG = 'REMOVE_BLOG',
  REMOVING_BLOG = 'REMOVING_BLOG',
  CREATE_BLOG = 'CREATE_BLOG',
  CREATING_BLOG = 'CREATING_BLOG',
}

interface BlogsState {
  blogs: IBlog[]
  loading: boolean
  liking: string[]
  removing: string[]
  commenting: string[]
  creating: boolean
}

interface ILoadingBlogs {
  type: BlogsActionType.LOADING_BLOGS
  data: boolean
}

interface IInitializeBlogs {
  type: BlogsActionType.INIT_BLOGS
  data: IBlog[]
}

interface ILikeBlog {
  type: BlogsActionType.LIKE_BLOG
  data: string
}

interface ILikingBlog {
  type: BlogsActionType.LIKING_BLOG
  data: { blog: IBlog; liking: boolean }
}

interface ICommentBlog {
  type: BlogsActionType.COMMENT_BLOG
  data: { blog: IBlog; comment: string }
}

interface ICommentingBlog {
  type: BlogsActionType.COMMENTING_BLOG
  data: { blog: IBlog; commenting: boolean }
}

interface IRemoveBlog {
  type: BlogsActionType.REMOVE_BLOG
  data: string
}

interface IRemovingBlog {
  type: BlogsActionType.REMOVING_BLOG
  data: { blog: IBlog; removing: boolean }
}

interface ICreateBlog {
  type: BlogsActionType.CREATE_BLOG
  data: IBlog
}

interface ICreatingBlog {
  type: BlogsActionType.CREATING_BLOG
  data: boolean
}

type BlogsActionInterfaces =
  | ILoadingBlogs
  | IInitializeBlogs
  | ILikeBlog
  | ILikingBlog
  | ICommentBlog
  | ICommentingBlog
  | IRemoveBlog
  | IRemovingBlog
  | ICreateBlog
  | ICreatingBlog

const initialState: BlogsState = {
  blogs: [],
  loading: false,
  liking: [],
  removing: [],
  commenting: [],
  creating: false,
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

    case BlogsActionType.LIKE_BLOG: {
      const likedBlog = state.blogs.find((blog) => blog.id === action.data)

      if (likedBlog) {
        const updatedBlog = {
          ...likedBlog,
          likes: likedBlog?.likes ? likedBlog.likes + 1 : 1,
        }

        return {
          ...state,
          blogs: state.blogs.map((blog) =>
            blog.id !== action.data ? blog : updatedBlog
          ),
        }
      }

      return state
    }

    case BlogsActionType.LIKING_BLOG: {
      let liking = [...state.liking]

      if (
        action.data.liking &&
        (liking.length === 0 || !liking.includes(action.data.blog.id))
      ) {
        liking.push(action.data.blog.id)
      } else if (!action.data.liking) {
        liking = liking.filter((blogId) => blogId !== action.data.blog.id)
      }

      return {
        ...state,
        liking,
      }
    }

    case BlogsActionType.COMMENT_BLOG: {
      const commentedBlog = state.blogs.find(
        (blog) => blog.id === action.data.blog.id
      )

      if (commentedBlog) {
        const updatedComments = [...(commentedBlog?.comments || [])]
        updatedComments.push(action.data.comment)

        const updatedBlog = {
          ...commentedBlog,
          comments: updatedComments,
        }

        return {
          ...state,
          blogs: state.blogs.map((blog) =>
            blog.id !== action.data.blog.id ? blog : updatedBlog
          ),
        }
      }

      return state
    }

    case BlogsActionType.COMMENTING_BLOG: {
      let commenting = [...state.commenting]

      if (
        action.data.commenting &&
        (commenting.length === 0 || !commenting.includes(action.data.blog.id))
      ) {
        commenting.push(action.data.blog.id)
      } else if (!action.data.commenting) {
        commenting = commenting.filter(
          (blogId) => blogId !== action.data.blog.id
        )
      }

      return {
        ...state,
        commenting,
      }
    }

    // FIXME: Should also remove from state->users->blogs (or reload users)
    case BlogsActionType.REMOVE_BLOG: {
      const filteredBlogs = [...state.blogs].filter(
        (blog) => blog.id !== action.data
      )
      return { ...state, blogs: filteredBlogs }
    }

    case BlogsActionType.REMOVING_BLOG: {
      let removing = [...state.removing]

      if (
        action.data.removing &&
        (removing.length === 0 || !removing.includes(action.data.blog.id))
      ) {
        removing.push(action.data.blog.id)
      } else if (!action.data.removing) {
        removing = removing.filter((blogId) => blogId !== action.data.blog.id)
      }

      return {
        ...state,
        removing,
      }
    }

    case BlogsActionType.CREATE_BLOG: {
      const blogs = [...state.blogs]
      blogs.push(action.data)

      return { ...state, blogs }
    }

    case BlogsActionType.CREATING_BLOG:
      return {
        ...state,
        creating: action.data,
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
    dispatch: ThunkDispatch<
      RootState,
      void,
      IInitializeBlogs | IAddNotification
    >
  ): Promise<void> => {
    dispatch(setLoadingBlogs(true))

    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: BlogsActionType.INIT_BLOGS,
        data: blogs.data?.data || [],
      })
    } catch (error: any) {
      dispatch(
        addNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to fetch blogs.',
          type: 'error',
        })
      )
    }

    dispatch(setLoadingBlogs(false))
  }
}

const likeBlog = (blog: IBlog) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, ILikeBlog | IAddNotification>
  ): Promise<void> => {
    dispatch(setLikingBlog(blog, true))

    try {
      await blogService.like({ id: blog.id, likes: blog.likes + 1 })

      dispatch({
        type: BlogsActionType.LIKE_BLOG,
        data: blog.id,
      })
    } catch (error: any) {
      dispatch(
        addNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to update likes.',
          type: 'error',
        })
      )
    }

    dispatch(setLikingBlog(blog, false))
  }
}

const setLikingBlog = (blog: IBlog, liking: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, ILikingBlog>): void => {
    dispatch({
      type: BlogsActionType.LIKING_BLOG,
      data: { blog, liking },
    })
  }
}

const commentBlog = (blog: IBlog, comment: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, ICommentBlog | IAddNotification>
  ): Promise<void> => {
    dispatch(setCommentingBlog(blog, true))

    try {
      await blogService.comment({ id: blog.id, comment })

      dispatch({
        type: BlogsActionType.COMMENT_BLOG,
        data: { blog, comment },
      })
    } catch (error: any) {
      dispatch(
        addNotification({
          message:
            error?.response?.data?.error?.message ||
            'Failed to update comments.',
          type: 'error',
        })
      )
    }

    dispatch(setCommentingBlog(blog, false))
  }
}

const setCommentingBlog = (blog: IBlog, commenting: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, ICommentingBlog>): void => {
    dispatch({
      type: BlogsActionType.COMMENTING_BLOG,
      data: { blog, commenting },
    })
  }
}

const removeBlog = (blog: IBlog) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, IRemoveBlog | IAddNotification>
  ): Promise<void> => {
    dispatch(setRemovingBlog(blog, true))

    try {
      await blogService.remove(blog.id)

      dispatch({
        type: BlogsActionType.REMOVE_BLOG,
        data: blog.id,
      })

      dispatch(
        addNotification({
          message: `Blog ${blog.title} removed.`,
          type: 'success',
        })
      )
    } catch (error: any) {
      dispatch(
        addNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to remove blog.',
          type: 'error',
        })
      )
    }

    dispatch(setRemovingBlog(blog, false))
  }
}

const setRemovingBlog = (blog: IBlog, removing: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, IRemovingBlog>): void => {
    dispatch({
      type: BlogsActionType.REMOVING_BLOG,
      data: { blog, removing },
    })
  }
}

const createBlog = (author: string, title: string, url: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, ICreateBlog | IAddNotification>
  ): Promise<void> => {
    dispatch(setCreatingBlog(true))

    try {
      const blog = await blogService.create({ title, author, url })

      if (blog.data.data) {
        dispatch({
          type: BlogsActionType.CREATE_BLOG,
          data: blog.data.data,
        })

        dispatch(
          addNotification({
            message: `Blog ${title} created.`,
            type: 'success',
          })
        )
      }
    } catch (error: any) {
      dispatch(
        addNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to create blog.',
          type: 'error',
        })
      )
    }

    dispatch(setCreatingBlog(false))
  }
}

const setCreatingBlog = (creating: boolean) => {
  return (dispatch: ThunkDispatch<RootState, void, ICreatingBlog>): void => {
    dispatch({
      type: BlogsActionType.CREATING_BLOG,
      data: creating,
    })
  }
}

export {
  blogReducer,
  initializeBlogs,
  likeBlog,
  commentBlog,
  removeBlog,
  createBlog,
}
