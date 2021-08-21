import express from 'express'

import { blogs } from './blogs'

const routes = express.Router()

routes.use('/api/blogs', blogs)

export { routes }
