import { useState } from 'react'

import { blogService } from '../services/blogs'
import { INotification } from '../interfaces/INotification'

type CreateBlogProps = {
  refreshBlogs: () => void
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
  setShowCreateBlog: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBlog = ({
  refreshBlogs,
  setNotification,
  setShowCreateBlog,
}: CreateBlogProps): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    setIsSubmitting(true)

    blogService
      .create({ title, author, url })
      .then(() => {
        setNotification({
          message: `A new blog "${title}" by "${author}" added.`,
          type: 'success',
        })

        setIsSubmitting(false)

        setTitle('')
        setAuthor('')
        setUrl('')

        refreshBlogs()

        setShowCreateBlog(false)
      })
      .catch((error) => {
        setNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to create blog.',
          type: 'error',
        })

        setIsSubmitting(false)
      })
  }

  return (
    <>
      <h2>Create new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }): void => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }): void => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }): void => setUrl(target.value)}
          />
        </div>

        <button type='submit' disabled={isSubmitting}>
          {!isSubmitting ? 'Create' : 'Creating...'}
        </button>
        <button onClick={(): void => setShowCreateBlog(false)}>Close</button>
      </form>
    </>
  )
}

export { CreateBlog }
