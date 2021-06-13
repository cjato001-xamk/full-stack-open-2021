import { useState, useEffect } from 'react'
import axios from 'axios'

import { ICountry } from '../interfaces/ICountry'

import { Suggestions } from './Suggestions'
import { Weather } from './Weather'
import { CountryInfo } from './CountryInfo'

type CountryInfoProps = {
  filter: string
  selectedCountry: ICountry | null
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountry | null>>
}

const CountryInfoMiddleware = ({
  filter,
  selectedCountry,
  setSelectedCountry,
}: CountryInfoProps): JSX.Element => {
  const [allCountries, setAllCountries] = useState<ICountry[]>([])
  const [suggestedCountries, setSuggestedCountries] = useState<ICountry[]>([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setAllCountries(response.data)
    })
  }, [])

  useEffect(() => {
    setSuggestedCountries(
      allCountries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    )
  }, [filter, allCountries])

  useEffect(() => {
    if (suggestedCountries.length === 1) {
      setSelectedCountry(suggestedCountries[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestedCountries])

  return (
    <>
      {suggestedCountries.length > 10 ? (
        <>Too many matches, specify another filter</>
      ) : (
        <>
          {selectedCountry !== null ? (
            <>
              <CountryInfo country={selectedCountry} />

              <Weather
                countryName={selectedCountry.name}
                lat={selectedCountry.latlng[0]}
                lon={selectedCountry.latlng[1]}
              />
            </>
          ) : (
            <Suggestions
              suggestedCountries={suggestedCountries}
              setSelectedCountry={setSelectedCountry}
            />
          )}
        </>
      )}
    </>
  )
}

export { CountryInfoMiddleware }
