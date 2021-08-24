import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'

const tokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.get('Authorization')

  req.token = authorization?.startsWith('Bearer ')
    ? authorization.substring(7)
    : null

  req.decodedToken = req.token
    ? jwt.verify(req.token, <string>process.env.JWT_SECRET)
    : null

  next()
}

const userExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  req.user = req.decodedToken ? await User.findById(req.decodedToken.id) : null

  next()
}

export { tokenExtractor, userExtractor }
