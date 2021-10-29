import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Alert, ListGroup, Form, Row, Col, Button } from 'react-bootstrap'

import { RootState } from '../../store'
import { likeBlog, commentBlog } from '../../reducers/blogReducer'

import { LikeButton } from '../LikeButton'
import { RemoveBlogButton } from '../RemoveBlogButton'

const Blog = (): JSX.Element => {
  const dispatch = useDispatch()

  const { id: blogId } = useParams<{ id: string }>()

  const blog = useSelector((state: RootState) =>
    state.blogs.blogs.find((blog) => blog.id === blogId)
  )
  const user = useSelector((state: RootState) => state.users.loggedInUser)

  const isLiking = useSelector((state: RootState) =>
    state.blogs.liking.some((bId) => bId === blogId)
  )

  const isCommenting = useSelector((state: RootState) =>
    state.blogs.commenting.some((bId) => bId === blogId)
  )

  const [comment, setComment] = useState<string>('')

  if (!blog) {
    return <Alert variant='danger'>Invalid blog!</Alert>
  }

  const like = (): void => {
    dispatch(likeBlog(blog))
  }

  const commentHandler = (): void => {
    dispatch(commentBlog(blog, comment))

    setComment('')
  }

  return (
    <>
      <h1>
        {blog.title} {blog.author}
      </h1>

      <p>
        <span className='text-muted'>Added by: </span>
        {blog.user.name}{' '}
        <span className='ps-4'>
          <a href={blog.url}>{blog.url}</a>
        </span>
      </p>

      <LikeButton like={like} isLiking={isLiking} likes={blog.likes} />
      {user?.id && user.id === blog.user.id && <RemoveBlogButton blog={blog} />}

      <h4 className='mt-4'>Comments</h4>

      <Form>
        <Row className='align-items-center'>
          <Col xs='auto' className='my-1'>
            <Form.Control
              type='text'
              value={comment}
              onChange={(event): void => setComment(event.target.value)}
            />
          </Col>
          <Col xs='auto' className='my-1'>
            <Button
              variant='primary'
              type='submit'
              onClick={commentHandler}
              disabled={isCommenting}
            >
              Add comment
            </Button>
          </Col>
        </Row>
      </Form>

      {blog.comments?.length !== 0 ? (
        <ListGroup variant='flush'>
          {blog.comments?.map((comment, index) => (
            <ListGroup.Item key={index}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant='info' className='mt-2'>
          Be first to comment?
        </Alert>
      )}
    </>
  )
}

export { Blog }
