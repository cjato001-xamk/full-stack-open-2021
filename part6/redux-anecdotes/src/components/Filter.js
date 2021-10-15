import { connect } from 'react-redux'

import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  return (
    <>
      <input
        style={{ marginBottom: 10 }}
        type='text'
        onChange={(event) => props.setFilter(event.target.value)}
      />
    </>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export { ConnectedFilter as Filter }
