import { ICountry } from '../interfaces/ICountry'

type SuggestionsProps = {
  suggestedCountries: ICountry[]
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountry | null>>
}

const Suggestions = ({
  suggestedCountries,
  setSelectedCountry,
}: SuggestionsProps): JSX.Element => {
  return (
    <>
      <h2>Suggestions</h2>

      {suggestedCountries.map((country) => (
        <p key={country.alpha2Code}>
          {country.name}{' '}
          <button onClick={(): void => setSelectedCountry(country)}>
            Show
          </button>
        </p>
      ))}
    </>
  )
}

export { Suggestions }
