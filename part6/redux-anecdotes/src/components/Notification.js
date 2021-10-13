import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    if (notification.message) {
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }, [dispatch, notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return notification.message && <div style={style}>{notification.message}</div>
}

export { Notification }
