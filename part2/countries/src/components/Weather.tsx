import axios from 'axios'

import { IWeather } from '../interfaces/IWeather'

import { useState, useEffect } from 'react'

type WeatherProps = {
  countryName: string
  lat: number
  lon: number
}

const Weather = ({ countryName, lat, lon }: WeatherProps): JSX.Element => {
  const [weather, setWeather] = useState<IWeather | null>(null)

  useEffect(() => {
    axios
      .get(
        `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [lat, lon])

  return (
    <>
      <h3>Weather in {countryName}</h3>

      {weather === null ? (
        <p>Invalid</p>
      ) : (
        <>
          <p>Temperature {weather.main.temp}</p>
          <p>Wind {weather.wind.speed} m/s</p>

          <img
            src={weather.weather[0].icon}
            alt={weather.weather[0].description}
          />
        </>
      )}
    </>
  )
}

export { Weather }
