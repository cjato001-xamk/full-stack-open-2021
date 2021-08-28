/* eslint-disable no-console */

import { config } from '../helpers/config'

const logger = {
  info: (...params: unknown[]): void => {
    if (config.NODE_ENV !== 'test') {
      console.log(...params)
    }
  },
  error: (...params: unknown[]): void => {
    if (config.NODE_ENV !== 'test') {
      console.error(...params)
    }
  },
}

export { logger }
