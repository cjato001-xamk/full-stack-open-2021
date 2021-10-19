import { Request, Response } from 'express'

import { IApiResponse } from '../interfaces/IApiResponse'

const unknownEndpoint = (
  req: Request,
  res: Response<IApiResponse<null>>
): Response<IApiResponse<null>> => {
  return res.status(404).send({ error: { message: 'Unknown endpoint.' } })
}

export { unknownEndpoint }
