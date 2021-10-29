import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { RootState } from '../../store'

import { CreateBlog } from '../CreateBlog'
import { Loading } from '../Loading'
import { BlogList } from '../BlogList'

const Blogs = (): JSX.Element => {
  const blogs = useSelector((state: RootState) =>
    state.blogs.blogs.sort((a, b) => b.likes - a.likes)
  )
  const isLoading = useSelector((state: RootState) => state.blogs.loading)

  const [showCreateBlog, setShowCreateBlog] = useState<boolean>(false)

  return (
    <>
      <h1>
        Blogs{' '}
        {!showCreateBlog && (
          <Button onClick={(): void => setShowCreateBlog(true)}>
            <FontAwesomeIcon icon={faPlus} /> Create new
          </Button>
        )}
      </h1>

      {showCreateBlog && <CreateBlog setShowCreateBlog={setShowCreateBlog} />}

      {isLoading && blogs.length === 0 ? (
        <Loading />
      ) : (
        <>
          {!showCreateBlog && <BlogList blogs={blogs} />}
          {isLoading && <p className='text-muted'>Updating bloglist...</p>}
        </>
      )}
    </>
  )
}

export { Blogs }
