const initialState = {
  type: 'success',
  message: 'test-message',
}

const notificationReducer = (state = initialState, action) => {
  console.log('notificationReducer called')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        type: action.data.notification.type || 'success',
        message: action.data.notification.message,
      }

    case 'REMOVE_NOTIFICATION':
      return { ...state, type: null, message: null }

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
