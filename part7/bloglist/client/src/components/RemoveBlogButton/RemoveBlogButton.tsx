import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { IBlog } from '../../interfaces/IBlog'
import { blogService } from '../../services/blogs'
import { addNotification } from '../../reducers/notificationReducer'

type RemoveBlogButtonProps = {
  blog: IBlog
  // refreshBlogs: () => void // FIXME
}

const RemoveBlogButton = ({ blog }: RemoveBlogButtonProps): JSX.Element => {
  const dispatch = useDispatch()

  const [areYouSure, setAreYouSure] = useState<boolean>(false)
  const [isRemoving, setIsRemoving] = useState<boolean>(false)

  const removeHandler = (): void => {
    setIsRemoving(true)

    blogService
      .remove(blog.id)
      .then(() => {
        dispatch(
          addNotification({
            message: `Blog "${blog.title}" removed.`,
            type: 'success',
          })
        )

        //refreshBlogs() // FIXME

        setIsRemoving(false)
      })
      .catch((error) => {
        dispatch(
          addNotification({
            message:
              error?.response?.data?.error?.message || 'Failed to remove blog.',
            type: 'error',
          })
        )

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
