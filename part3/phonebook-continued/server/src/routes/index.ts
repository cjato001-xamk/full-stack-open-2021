import express from 'express'

import { persons } from './persons'
import { info } from './info'

const routes = express.Router()

routes.use('/api/persons', persons)
routes.use('/info', info)

export { routes }
