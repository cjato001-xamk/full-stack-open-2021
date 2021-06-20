import express, { Application, Request } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

import { routes } from './routes'
import { errorHandler } from './helpers/errorHandler'

const app: Application = express()

// Helmet
app.use(helmet())

// Cors
app.use(cors())

// JSON
app.use(express.json())

// Set static folder
app.use(express.static(path.join(__dirname, '..', 'public')))

// Custom Morgan token to log the request body
morgan.token('body', (req: Request) => JSON.stringify(req.body))

// Morgan
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// Routes
app.use('/', routes)

// Error handling
app.use(errorHandler)

export { app }
