import mongoose from 'mongoose'

import { logger } from '../helpers/logger'
import { config } from '../helpers/config'

mongoose.Promise = global.Promise

const removeAllCollections = async (): Promise<void> => {
  const collections = Object.keys(mongoose.connection.collections)

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]

    try {
      await collection.deleteMany({})
    } catch (error) {
      logger.error(error.message, error)
    }
  }
}

const dropAllCollections = async (): Promise<void> => {
  const collections = Object.keys(mongoose.connection.collections)

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]

    try {
      await collection.drop()
    } catch (error) {
      // These errors can be safely ignored
      if (error.message === 'ns not found') return
      if (error.message.includes('a background operation is currently running'))
        return

      logger.error(error.message, error)
    }
  }
}

const setupTestDatabase = (databaseName: string): void => {
  // Connect to Mongoose
  beforeAll(async () => {
    try {
      await mongoose.connect(config.MONGODB_URI, {
        dbName: databaseName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
    } catch (error) {
      logger.error('Jest failed to connect to MongoDB!', error)
    }
  })

  // Cleans up database between each test
  afterEach(async () => {
    await removeAllCollections()
  })

  // Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections()

    await mongoose.connection.close()
  })
}

export { setupTestDatabase }
