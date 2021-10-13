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
      console.log('TODO add')
      return state

    default:
      console.log('type did not match', action.type)
      return state
  }
}

export { notificationReducer }
