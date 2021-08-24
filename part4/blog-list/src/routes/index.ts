import express from 'express'

import { auth } from './auth'
import { blogs } from './blogs'
import { users } from './users'

const routes = express.Router()

routes.use('/api/auth', auth)
routes.use('/api/blogs', blogs)
routes.use('/api/users', users)

export { routes }
