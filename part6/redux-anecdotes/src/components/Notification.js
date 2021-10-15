import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { removeNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  // Notifies each notification from the state in
  // FIFO order
  useEffect(() => {
    if (props.notification) {
      setTimeout(() => {
        props.removeNotification()
      }, props.notification.timeout * 1000 || 5000)
    }
  }, [props])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return props.notification ? (
    <div style={style}>{props.notification.message}</div>
  ) : null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.notifications[0],
  }
}

const mapDispatchToProps = {
  removeNotification,
}

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)

export { ConnectedNotification as Notification }
