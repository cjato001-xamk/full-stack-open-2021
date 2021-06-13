import { ICountry } from '../interfaces/ICountry'

type CountryInfoProps = {
  country: ICountry
}

const CountryInfo = ({ country }: CountryInfoProps): JSX.Element => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <p>Languages</p>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>

      <img src={country.flag} alt={country.name} style={{ height: '4rem' }} />
    </>
  )
}

export { CountryInfo }
