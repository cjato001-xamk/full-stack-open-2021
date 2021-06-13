export interface IWeather {
  main: { temp: number }
  wind: { speed: number }
  weather: {
    0: { icon: string; description: string }
  }
}
