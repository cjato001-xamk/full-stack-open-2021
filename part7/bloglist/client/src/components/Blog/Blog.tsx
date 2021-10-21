import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { IBlog } from '../../interfaces/IBlog'
import { authService } from '../../services/auth'
import { blogService } from '../../services/blogs'
import { addNotification } from '../../reducers/notificationReducer'

import { LikeButton } from '../LikeButton'
import { RemoveBlogButton } from '../RemoveBlogButton'

type BlogProps = {
  blog: IBlog
  refreshBlogs: () => void
}

const Blog = ({ blog, refreshBlogs }: BlogProps): JSX.Element => {
  const dispatch = useDispatch()

  const [showBlogDetails, setShowBlogDetails] = useState<boolean>(false)
  const [isLiking, setIsLiking] = useState<boolean>(false)

  const user = authService.getUser()

  const like = (): void => {
    setIsLiking(true)

    blogService
      .like({ id: blog.id, likes: blog.likes + 1 })
      .then(() => {
        refreshBlogs()

        setIsLiking(false)
      })
      .catch((error) => {
        dispatch(
          addNotification({
            message:
              error?.response?.data?.error?.message ||
              'Failed to update likes.',
            type: 'error',
          })
        )

        setIsLiking(false)
      })
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
            <RemoveBlogButton blog={blog} refreshBlogs={refreshBlogs} />
          )}
        </>
      )}
    </div>
  )
}

export { Blog }
