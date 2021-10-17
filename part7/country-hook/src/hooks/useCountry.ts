import { useState, useEffect } from 'react'
import axios from 'axios'

import { ICountry } from '../interfaces/ICountry'

const useCountry = (name: string) => {
  const [country, setCountry] = useState<
    null | ICountry[] | { status: number; message: string }
  >(null)

  useEffect(() => {
    if (name) {
      axios
        .get<ICountry[] | { status: number; message: string }>(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        )
        .then((response) => {
          setCountry(response.data)
        })
        .catch((error) => {
          setCountry({
            status: error.status,
            message: error.response?.data?.message,
          })
        })
    }
  }, [name])

  return country
}

export { useCountry }
