import mongoose from 'mongoose'

import { app } from './app'
import { logger } from './helpers/logger'

const PORT = process.env.PORT || 3001

// Mongoose connect
mongoose
  .connect(<string>process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info('MongoDB connected.')

    app.listen(<string>PORT, () => {
      logger.info(`Server listening on ${PORT}`)

      if (process.env.NODE_ENV === 'development') {
        logger.info(`App can be accessed at http://localhost:${PORT}`)
      }
    })
  })
  .catch((error) => {
    logger.error(
      'Failed to connect to MongoDB. Server not started.',
      error.message
    )
  })
