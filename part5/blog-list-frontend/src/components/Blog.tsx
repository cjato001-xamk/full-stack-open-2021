import { useState } from 'react'

import { IBlog } from '../interfaces/IBlog'
import { INotification } from '../interfaces/INotification'
import { authService } from '../services/auth'
import { blogService } from '../services/blogs'

import { RemoveBlogButton } from './RemoveBlogButton'

type BlogProps = {
  blog: IBlog
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
  refreshBlogs: () => void
}

const Blog = ({
  blog,
  setNotification,
  refreshBlogs,
}: BlogProps): JSX.Element => {
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
        setNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to update likes.',
          type: 'error',
        })

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
      {blog.title} {blog.author}{' '}
      <button onClick={(): void => setShowBlogDetails(!showBlogDetails)}>
        {showBlogDetails ? 'Hide' : 'Show'} details
      </button>
      {showBlogDetails && (
        <>
          <ul>
            <li>{blog.url}</li>
            <li>
              Likes: {blog.likes}{' '}
              <button onClick={like} disabled={isLiking}>
                {!isLiking ? 'Like' : 'Liking...'}
              </button>
            </li>
            <li>{blog.user.name}</li>
          </ul>

          {user?.id && user.id === blog.user.id && (
            <RemoveBlogButton
              blog={blog}
              setNotification={setNotification}
              refreshBlogs={refreshBlogs}
            />
          )}
        </>
      )}
    </div>
  )
}

export { Blog }
