const initialState = {
  notifications: [],
}

const notificationReducer = (state = initialState, action) => {
  console.log('notificationReducer called')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const notificationsAfterAdd = [...state.notifications]
      notificationsAfterAdd.push({
        type: action.data.notification.type || 'success',
        message: action.data.notification.message,
        timeout: action.data.notification.timeout,
      })
      console.log('after add', notificationsAfterAdd)
      return {
        ...state,
        notifications: notificationsAfterAdd,
      }

    case 'REMOVE_NOTIFICATION':
      // Simply removes the oldest item from the notifications array
      const notificationsAfterRemove = [...state.notifications]
      notificationsAfterRemove.shift()
      console.log('after remove', notificationsAfterRemove)
      return { ...state, notifications: notificationsAfterRemove || [] }

    default:
      console.log('type did not match', action.type)
      return state
  }
}

const addNotification = (notification) => {
  return {
    type: 'ADD_NOTIFICATION',
    data: { notification },
  }
}

const removeNotification = () => {
  return { type: 'REMOVE_NOTIFICATION', data: {} }
}

export { notificationReducer, addNotification, removeNotification }
