import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { RootState } from '../../store'
import { createBlog } from '../../reducers/blogReducer'

type CreateBlogProps = {
  setShowCreateBlog: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBlog = ({ setShowCreateBlog }: CreateBlogProps): JSX.Element => {
  const dispatch = useDispatch()

  const isSubmitting = useSelector((state: RootState) => state.blogs.creating)

  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    dispatch(createBlog(title, author, url))

    setTitle('')
    setAuthor('')
    setUrl('')
    setShowCreateBlog(false)
  }

  return (
    <>
      <h3>Create new blog</h3>

      <Form onSubmit={handleSubmit} className='mb-4'>
        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={title}
            name='title'
            onChange={({ target }): void => setTitle(target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type='text'
            value={author}
            name='author'
            onChange={({ target }): void => setAuthor(target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Url</Form.Label>
          <Form.Control
            type='text'
            value={url}
            name='url'
            onChange={({ target }): void => setUrl(target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' disabled={isSubmitting}>
          {!isSubmitting ? 'Create' : 'Creating...'}
        </Button>

        <Button
          variant='link'
          type='submit'
          onClick={(): void => setShowCreateBlog(false)}
        >
          Close
        </Button>
      </Form>
    </>
  )
}

export { CreateBlog }
