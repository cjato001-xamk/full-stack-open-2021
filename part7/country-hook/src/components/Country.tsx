import { ICountry } from '../interfaces/ICountry'

type CountryProps = {
  country:
    | ICountry[]
    | {
        status: number
        message: string
      }
    | null
}

const Country = ({ country }: CountryProps) => {
  if (!country) {
    return null
  }

  if ('status' in country) {
    return <div>not found... {country.message}</div>
  }

  const selectedCountry = country[0]

  return (
    <div>
      <h3>{selectedCountry.name.official} </h3>
      <div>capital {selectedCountry.capital[0]}</div>
      <div>population {selectedCountry.population}</div>
      <img
        src={selectedCountry.flags.png}
        height='100'
        alt={`flag of ${selectedCountry.name.official}`}
      />
    </div>
  )
}

export { Country }
