import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { IApiResponse } from '../../interfaces/IApiResponse'
import { IUserClient } from '../../interfaces/IUser'
import { User } from '../../models/user'
import { config } from '../../helpers/config'

const auth = express.Router()

auth.post(
  '/login',
  async (req: Request, res: Response<IApiResponse<IUserClient>>) => {
    const { body } = req

    if (!body.username) {
      return res
        .status(400)
        .json({ error: { message: 'Username is required.' } })
    }

    if (!body.password) {
      return res
        .status(400)
        .json({ error: { message: 'Password is required.' } })
    }

    const user = await User.findOne({ username: body.username })
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: { message: 'Invalid username or password.' },
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, config.JWT_SECRET, {
      expiresIn: 60 * 60,
    })

    return res.status(200).send({
      data: { token, id: user._id, username: user.username, name: user.name },
    })
  }
)

export { auth }
