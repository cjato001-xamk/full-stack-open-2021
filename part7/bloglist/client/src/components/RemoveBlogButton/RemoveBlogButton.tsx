import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import { IBlog } from '../../interfaces/IBlog'
import { removeBlog } from '../../reducers/blogReducer'

type RemoveBlogButtonProps = {
  blog: IBlog
}

const RemoveBlogButton = ({ blog }: RemoveBlogButtonProps): JSX.Element => {
  const dispatch = useDispatch()

  const isRemoving = useSelector((state: RootState) =>
    state.blogs.removing.some((blogId) => blogId === blog.id)
  )

  const [areYouSure, setAreYouSure] = useState<boolean>(false)

  const removeHandler = (): void => {
    dispatch(removeBlog(blog))
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
