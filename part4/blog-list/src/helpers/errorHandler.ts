import { Request, Response, Errback, NextFunction } from 'express'
import { Error } from 'mongoose'

import { IApiResponse } from '../interfaces/IApiResponse'
import { logger } from './logger'

const errorHandler = (
  error: Errback | Error,
  req: Request,
  res: Response<IApiResponse<null>>,
  // eslint-disable-next-line
  next: NextFunction
): Response<IApiResponse<null>> => {
  logger.error(error)

  if (error.name === 'CastError') {
    return res.status(400).json({
      error: {
        message: 'Cast error',
        stack: error,
      },
    })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        message: error.toString(),
        stack: error,
      },
    })
  }

  return res.status(500).json({
    error: {
      message: 'Unknown internal server error occurred, please try again.',
      stack: error,
    },
  })
}

export { errorHandler }
