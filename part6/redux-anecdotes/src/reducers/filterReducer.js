const initialState = {
  text: '',
}

const filterReducer = (state = initialState, action) => {
  console.log('notificationReducer called')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        text: action.data.filter,
      }

    default:
      console.log('type did not match', action.type)
      return state
  }
}

const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: { filter },
  }
}

export { filterReducer, setFilter }
