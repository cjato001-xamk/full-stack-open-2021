import express, { Request, Response } from 'express'

import { IApiResponse } from '../../interfaces/IApiResponse'
import { User } from '../../models/user'
import { Blog } from '../../models/blog'

const testing = express.Router()

/**
 * Wipes database
 *
 * To be used eg. from Cypress between tests
 */
testing.post(
  '/reset',
  async (req: Request, res: Response<IApiResponse<null>>) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    return res.status(200).send({})
  }
)

export { testing }
