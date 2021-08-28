import mongoose from 'mongoose'

import { app } from './app'
import { logger } from './helpers/logger'
import { config } from './helpers/config'

// Mongoose connect
mongoose
  .connect(config.MONGODB_URI, {
    dbName: config.MONGODB_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info('MongoDB connected.')

    app.listen(config.PORT, () => {
      logger.info(
        `Server listening on ${config.PORT}, NODE_ENV is ${config.NODE_ENV}.`
      )

      if (config.NODE_ENV === 'development') {
        logger.info(`App can be accessed at http://localhost:${config.PORT}`)
      }
    })
  })
  .catch((error) => {
    logger.error(
      'Failed to connect to MongoDB. Server not started.',
      error.message
    )
  })
