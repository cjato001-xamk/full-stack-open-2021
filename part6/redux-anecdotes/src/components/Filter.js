import { useDispatch } from 'react-redux'

import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  return (
    <>
      <input
        style={{ marginBottom: 10 }}
        type='text'
        onChange={(event) => dispatch(setFilter(event.target.value))}
      />
    </>
  )
}

export { Filter }
