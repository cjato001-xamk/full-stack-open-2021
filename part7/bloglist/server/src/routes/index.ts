import express from 'express'

import { config } from '../helpers/config'
import { auth } from './auth'
import { blogs } from './blogs'
import { users } from './users'
import { status } from './status'
import { testing } from './testing'

const routes = express.Router()

routes.use('/api/auth', auth)
routes.use('/api/blogs', blogs)
routes.use('/api/users', users)
routes.use('/api/status', status)

if (config.NODE_ENV === 'test') {
  routes.use('/api/testing', testing)
}

export { routes }
