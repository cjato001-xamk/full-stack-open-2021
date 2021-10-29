import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons'

import { RootState } from '../../store'
import { IBlog } from '../../interfaces/IBlog'
import { removeBlog } from '../../reducers/blogReducer'

type RemoveBlogButtonProps = {
  blog: IBlog
}

const RemoveBlogButton = ({ blog }: RemoveBlogButtonProps): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()

  const isRemoving = useSelector((state: RootState) =>
    state.blogs.removing.some((blogId) => blogId === blog.id)
  )

  const [areYouSure, setAreYouSure] = useState<boolean>(false)

  const removeHandler = (): void => {
    dispatch(removeBlog(blog))

    history.push('/')
  }

  return (
    <div className='mt-4'>
      {!areYouSure ? (
        <Button variant='dark' onClick={(): void => setAreYouSure(true)}>
          <FontAwesomeIcon icon={faTrash} /> Remove
        </Button>
      ) : (
        <>
          {!isRemoving ? (
            <span>
              Are you sure?{' '}
              <Button onClick={removeHandler} variant='danger'>
                <FontAwesomeIcon icon={faTrash} /> Yes
              </Button>{' '}
              <Button onClick={(): void => setAreYouSure(false)}>
                <FontAwesomeIcon icon={faBan} /> Cancel
              </Button>
            </span>
          ) : (
            <Alert variant='info'>Removing...</Alert>
          )}
        </>
      )}
    </div>
  )
}

export { RemoveBlogButton }
