import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { blogService } from '../../services/blogs'
import { IBlog } from '../../interfaces/IBlog'
import { addNotification } from '../../reducers/notificationReducer'

import { Blog } from '../Blog'
import { CreateBlog } from '../CreateBlog'
import { Loading } from '../Loading'

const Blogs = (): JSX.Element => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showCreateBlog, setShowCreateBlog] = useState<boolean>(false)

  useEffect(() => {
    refreshBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refreshBlogs = (): void => {
    setIsLoading(true)

    blogService
      .getAll()
      .then((response) => {
        setBlogs(response.data.data?.sort((a, b) => b.likes - a.likes) || [])

        setIsLoading(false)
      })
      .catch((error) => {
        dispatch(
          addNotification({
            message:
              error?.response?.data?.error?.message || 'Failed to fetch blogs.',
            type: 'error',
          })
        )

        setIsLoading(false)
      })
  }

  return (
    <div>
      <h2>
        Blogs{' '}
        {!showCreateBlog && (
          <button onClick={(): void => setShowCreateBlog(true)}>
            + Create new
          </button>
        )}
      </h2>

      {showCreateBlog && (
        <CreateBlog
          refreshBlogs={refreshBlogs}
          setShowCreateBlog={setShowCreateBlog}
        />
      )}

      {isLoading && blogs.length === 0 ? (
        <Loading />
      ) : (
        <>
          <div id='blogs'>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} refreshBlogs={refreshBlogs} />
            ))}
          </div>
          {isLoading && <p>Updating bloglist...</p>}
        </>
      )}
    </div>
  )
}

export { Blogs }
