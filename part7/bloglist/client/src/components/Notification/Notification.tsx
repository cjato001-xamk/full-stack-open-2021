import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Toast, ToastContainer } from 'react-bootstrap'

import { RootState } from '../../store'
import { removeNotification } from '../../reducers/notificationReducer'
import { INotification } from '../../interfaces/INotification'

const Notification = (): JSX.Element | null => {
  const dispatch = useDispatch()

  // Notifies each notification from the state in
  // FIFO order
  const notification: INotification = useSelector(
    (state: RootState) => state.notification.notifications[0]
  )

  useEffect(() => {
    if (notification) {
      setTimeout(
        () => {
          dispatch(removeNotification())
        },
        notification.timeout ? notification.timeout : 3000
      )
    }
  }, [dispatch, notification])

  return notification ? (
    <ToastContainer position='bottom-center'>
      <Toast bg={notification.type === 'error' ? 'danger' : 'success'}>
        <Toast.Header closeButton={false}>
          <strong className='me-auto'>
            {notification.type === 'error' ? 'Error occurred!' : 'Whuhuu!'}
          </strong>
        </Toast.Header>
        <Toast.Body>{notification.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  ) : null
}

export { Notification }
