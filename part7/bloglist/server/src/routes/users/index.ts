import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { IApiResponse } from '../../interfaces/IApiResponse'
import { IUserClient } from '../../interfaces/IUser'
import { User } from '../../models/user'

const users = express.Router()

users.get(
  '/',
  async (req: Request, res: Response<IApiResponse<IUserClient[]>>) => {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1,
    })

    return res.json({
      data: users.map((user) => user.toJSON()) as unknown as IUserClient[],
    })
  }
)

users.get(
  '/:id',
  async (req: Request, res: Response<IApiResponse<IUserClient>>) => {
    const { id } = req.params

    const user = await User.findOne({ _id: id }).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1,
    })

    if (user) {
      return res.json({
        data: user.toJSON() as unknown as IUserClient,
      })
    } else {
      return res.status(404).json({
        error: { message: 'User with the requested id does not exist.' },
      })
    }
  }
)

users.delete(
  '/:id',
  async (req: Request, res: Response<IApiResponse<null>>) => {
    await User.findByIdAndRemove(req.params.id)

    return res.status(204).json({})
  }
)

users.post(
  '/',
  async (req: Request, res: Response<IApiResponse<IUserClient>>) => {
    const { body } = req

    if (!body.username) {
      return res
        .status(400)
        .json({ error: { message: 'Username is required.' } })
    }

    if (!body.name) {
      return res.status(400).json({ error: { message: 'Name is required.' } })
    }

    if (!body.password || body.password.length <= 3) {
      return res.status(400).json({
        error: {
          message:
            'Password is required and must have at least three characters.',
        },
      })
    }

    const usernameExists = await User.findOne({ username: body.username })

    if (usernameExists) {
      return res
        .status(409)
        .json({ error: { message: 'Username already exists.' } })
    }

    const passwordHash = await bcrypt.hash(body.password, 10)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    return res.json({
      data: savedUser.toJSON() as unknown as IUserClient,
    })
  }
)

export { users }
