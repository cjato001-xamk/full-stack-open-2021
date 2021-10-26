import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import { IBlog } from '../../interfaces/IBlog'
import { authService } from '../../services/auth'
import { likeBlog } from '../../reducers/blogReducer'

import { LikeButton } from '../LikeButton'
import { RemoveBlogButton } from '../RemoveBlogButton'

type BlogProps = {
  blog: IBlog
}

const Blog = ({ blog }: BlogProps): JSX.Element => {
  const dispatch = useDispatch()

  const isLiking = useSelector((state: RootState) =>
    state.blogs.liking.some((blogId) => blogId === blog.id)
  )

  const [showBlogDetails, setShowBlogDetails] = useState<boolean>(false)

  const user = authService.getUser()

  const like = (): void => {
    dispatch(likeBlog(blog))
  }

  return (
    <div
      style={{
        padding: 10,
        border: '1px solid #ddd',
        marginBottom: 2,
      }}
    >
      <span className='header'>
        {blog.title} {blog.author}{' '}
        <button onClick={(): void => setShowBlogDetails(!showBlogDetails)}>
          {showBlogDetails ? 'Hide' : 'Show'} details
        </button>
      </span>
      {showBlogDetails && (
        <>
          <ul>
            <li>{blog.url}</li>
            <li>
              Likes: {blog.likes} <LikeButton like={like} isLiking={isLiking} />
            </li>
            <li>{blog.user.name}</li>
          </ul>

          {user?.id && user.id === blog.user.id && (
            <RemoveBlogButton blog={blog} />
          )}
        </>
      )}
    </div>
  )
}

export { Blog }
