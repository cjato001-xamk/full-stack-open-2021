import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()

  // Notifies each notification from the state in
  // FIFO order
  const notification = useSelector(
    (state) => state.notification.notifications[0]
  )

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(removeNotification())
      }, notification.timeout * 1000 || 5000)
    }
  }, [dispatch, notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return notification ? <div style={style}>{notification.message}</div> : null
}

export { Notification }
