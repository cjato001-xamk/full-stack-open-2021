/* eslint-disable no-console */

const logger = {
  info: (...params: unknown[]): void => {
    console.log(...params)
  },
  error: (...params: unknown[]): void => {
    console.error(...params)
  },
}

export { logger }
