import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../store'

import { CreateBlog } from '../CreateBlog'
import { Loading } from '../Loading'

const Blogs = (): JSX.Element => {
  const blogs = useSelector((state: RootState) =>
    state.blogs.blogs.sort((a, b) => b.likes - a.likes)
  )
  const isLoading = useSelector((state: RootState) => state.blogs.loading)

  const [showCreateBlog, setShowCreateBlog] = useState<boolean>(false)

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

      {showCreateBlog && <CreateBlog setShowCreateBlog={setShowCreateBlog} />}

      {isLoading && blogs.length === 0 ? (
        <Loading />
      ) : (
        <>
          <ul id='blogs'>
            {blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
          {isLoading && <p>Updating bloglist...</p>}
        </>
      )}
    </div>
  )
}

export { Blogs }
