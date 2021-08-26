import { useState } from 'react'
import { IBlog } from '../interfaces/IBlog'
import { INotification } from '../interfaces/INotification'
import { blogService } from '../services/blogs'

type RemoveBlogButtonProps = {
  blog: IBlog
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
  refreshBlogs: () => void
}

const RemoveBlogButton = ({
  blog,
  setNotification,
  refreshBlogs,
}: RemoveBlogButtonProps): JSX.Element => {
  const [areYouSure, setAreYouSure] = useState<boolean>(false)
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const removeHandler = (): void => {
    setIsRemoving(true)

    blogService
      .remove(blog.id)
      .then(() => {
        setNotification({
          message: `Blog "${blog.title}" removed.`,
          type: 'success',
        })

        refreshBlogs()

        setIsRemoving(false)
      })
      .catch((error) => {
        setNotification({
          message:
            error?.response?.data?.error?.message || 'Failed to remove blog.',
          type: 'error',
        })

        setIsRemoving(false)
      })
  }

  return (
    <>
      {!areYouSure ? (
        <button onClick={(): void => setAreYouSure(true)}>Remove</button>
      ) : (
        <>
          {!isRemoving ? (
            <span>
              Are you sure? <button onClick={removeHandler}>Yes</button>{' '}
              <button onClick={(): void => setAreYouSure(false)}>Cancel</button>
            </span>
          ) : (
            <span>Removing...</span>
          )}
        </>
      )}
    </>
  )
}

export { RemoveBlogButton }
