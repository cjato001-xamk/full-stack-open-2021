/* eslint-disable no-console */

const logger = {
  info: (...params: unknown[]): void => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(...params)
    }
  },
  error: (...params: unknown[]): void => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(...params)
    }
  },
}

export { logger }
