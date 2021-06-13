interface ILanguage {
  iso639_1: string
  name: string
}

export interface ICountry {
  alpha2Code: string
  name: string
  capital: string
  population: number
  languages: ILanguage[]
  flag: string
  latlng: {
    0: number
    1: number
  }
}
