import express, { Request, Response } from 'express'

import { IApiResponse } from '../../interfaces/IApiResponse'

const status = express.Router()

status.get('/', async (req: Request, res: Response<IApiResponse<null>>) => {
  return res.status(200).send({})
})

export { status }
