import { useState, useEffect } from 'react'

import { Blog } from './Blog'
import { blogService } from '../services/blogs'
import { IBlog } from '../interfaces/IBlog'
import { INotification } from '../interfaces/INotification'

import { CreateBlog } from './CreateBlog'
import { Loading } from './Loading'

type BlogsProps = {
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const Blogs = ({ setNotification }: BlogsProps): JSX.Element => {
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    refreshBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refreshBlogs = (): void => {
    setIsLoading(true)

    blogService
      .getAll()
      .then((response) => {
        setBlogs(response.data.data || [])

        setIsLoading(false)
      })
      .catch((error) => {
        setNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to fetch blogs.',
          type: 'error',
        })

        setIsLoading(false)
      })
  }

  return (
    <div>
      <h2>Blogs</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}

      <CreateBlog
        refreshBlogs={refreshBlogs}
        setNotification={setNotification}
      />
    </div>
  )
}

export { Blogs }
