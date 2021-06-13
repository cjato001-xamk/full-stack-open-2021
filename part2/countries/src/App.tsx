import { useState } from 'react'

import { ICountry } from './interfaces/ICountry'

import { Filter } from './components/Filter'
import { CountryInfoMiddleware } from './components/CountryInfoMiddleware'

const App = (): JSX.Element => {
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)

  return (
    <div>
      <h1>Country Info</h1>

      <Filter
        filter={filter}
        setFilter={setFilter}
        setSelectedCountry={setSelectedCountry}
      />

      <CountryInfoMiddleware
        filter={filter}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  )
}

export { App }
