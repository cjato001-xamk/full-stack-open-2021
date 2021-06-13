import { ICountry } from '../interfaces/ICountry'

type FilterProps = {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountry | null>>
}

const Filter = ({
  filter,
  setFilter,
  setSelectedCountry,
}: FilterProps): JSX.Element => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <>
      <p>
        Filter countries{' '}
        <input type="text" value={filter} onChange={handleOnChange} />
      </p>
    </>
  )
}

export { Filter }
