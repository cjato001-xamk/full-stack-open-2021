import mongoose from 'mongoose'

import { app } from './app'

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
    // eslint-disable-next-line no-console
    console.log('MongoDB connected.')

    // Listen
    app.listen(<string>PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on ${PORT}`)
    })
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(
      'Failed to connect to MongoDB. Server not started.',
      error.message
    )
  })
