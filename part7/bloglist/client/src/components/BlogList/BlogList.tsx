import { Link } from 'react-router-dom'
import { ListGroup, Alert } from 'react-bootstrap'

import { IBlog } from '../../interfaces/IBlog'

type BlogListProps = {
  blogs?: IBlog[] | Pick<IBlog, 'id' | 'title' | 'url' | 'author'>[]
}

const BlogList = ({ blogs }: BlogListProps): JSX.Element => {
  return (
    <>
      {blogs ? (
        <ListGroup>
          {blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant='info'>No blogs.</Alert>
      )}
    </>
  )
}

export { BlogList }
