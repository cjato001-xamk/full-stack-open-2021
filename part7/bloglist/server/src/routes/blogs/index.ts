import express, { Request, Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'

import { IApiResponse } from '../../interfaces/IApiResponse'
import { IBlogClient } from '../../interfaces/IBlog'
import { Blog } from '../../models/blog'
import { tokenExtractor, userExtractor } from '../../helpers/auth'

const blogs = express.Router()

blogs.get(
  '/',
  async (req: Request, res: Response<IApiResponse<IBlogClient[]>>) => {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })

    return res.json({
      data: blogs.map((blog) => blog.toJSON()),
    })
  }
)

blogs.get(
  '/:id',
  async (req: Request, res: Response<IApiResponse<IBlogClient>>) => {
    const { id } = req.params

    const blog = await Blog.findOne({ _id: id }).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })

    if (blog) {
      return res.json({
        data: blog.toJSON(),
      })
    } else {
      return res.status(404).json({
        error: { message: 'Blog with the requested id does not exist.' },
      })
    }
  }
)

blogs.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req: Request, res: Response<IApiResponse<null>>) => {
    const { token, decodedToken, user } = req

    if (!token || !decodedToken) {
      throw new JsonWebTokenError('Invalid or missing token.')
    }

    if (!user) {
      return res.status(401).json({ error: { message: 'User not found.' } })
    }

    const blog = await Blog.findById({ _id: req.params.id })

    if (!blog) {
      return res.status(400).json({ error: { message: 'Blog not found.' } })
    }

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(req.params.id)

      return res.status(204).json({})
    }

    return res.status(401).json({ error: { message: 'Not allowed.' } })
  }
)

blogs.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (req: Request, res: Response<IApiResponse<IBlogClient>>) => {
    const { token, decodedToken, user } = req

    if (!token || !decodedToken) {
      throw new JsonWebTokenError('Invalid or missing token.')
    }

    if (!user) {
      return res.status(401).json({ error: { message: 'User not found.' } })
    }

    const blog = new Blog({ ...req.body, user: user._id })
    const savedBlog = await blog.save()

    user.blogs = user.blogs ? user.blogs.concat(savedBlog._id) : [savedBlog._id]
    await user.save()

    return res.json({
      data: savedBlog.toJSON(),
    })
  }
)

blogs.patch(
  '/:id/comments',
  tokenExtractor,
  userExtractor,
  async (req: Request, res: Response<IApiResponse<null>>) => {
    const { token, decodedToken, user } = req

    if (!token || !decodedToken) {
      throw new JsonWebTokenError('Invalid or missing token.')
    }

    if (!user) {
      return res.status(401).json({ error: { message: 'User not found.' } })
    }

    const { id } = req.params
    const { comment } = req.body
    await Blog.findByIdAndUpdate(id, { $push: { comments: comment } })

    return res.status(204).json({})
  }
)

blogs.patch(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req: Request, res: Response<IApiResponse<null>>) => {
    const { token, decodedToken, user } = req

    if (!token || !decodedToken) {
      throw new JsonWebTokenError('Invalid or missing token.')
    }

    if (!user) {
      return res.status(401).json({ error: { message: 'User not found.' } })
    }

    const { id } = req.params
    await Blog.findByIdAndUpdate(id, req.body)

    return res.status(204).json({})
  }
)

export { blogs }
