import React from 'react'

type FilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const Filter = ({ setFilter }: FilterProps): JSX.Element => {
  const filterPhonebook = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFilter(event.target.value)
  }

  return (
    <div>
      Filter: <input type="text" onChange={filterPhonebook} />
    </div>
  )
}

export { Filter }
