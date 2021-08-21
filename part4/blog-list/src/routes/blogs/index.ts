import express, { Request, Response, NextFunction } from 'express'

import { IApiResponse } from '../../interfaces/IApiResponse'
import { IBlogDoc } from '../../interfaces/IBlog'
import { Blog } from '../../models/blog'

const blogs = express.Router()

blogs.get(
  '/',
  (
    req: Request,
    res: Response<IApiResponse<IBlogDoc[]>>,
    next: NextFunction
  ) => {
    Blog.find({})
      .then((blogs) => {
        return res.json({
          data: blogs,
        })
      })
      .catch((error) => {
        next(error)
      })
  }
)

blogs.get(
  '/:id',
  async (
    req: Request,
    res: Response<IApiResponse<IBlogDoc>>,
    next: NextFunction
  ) => {
    const { id } = req.params

    Blog.findOne({ _id: id })
      .then((blog) => {
        if (blog) {
          return res.json({
            data: blog,
          })
        } else {
          return res.status(404).json({
            error: { message: 'Blog with the requested id does not exist.' },
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  }
)

blogs.delete(
  '/:id',
  (req: Request, res: Response<IApiResponse<null>>, next: NextFunction) => {
    Blog.findByIdAndRemove(req.params.id)
      .then(() => {
        return res.status(200).json({})
      })
      .catch((error) => {
        next(error)
      })
  }
)

blogs.post(
  '/',
  async (
    req: Request,
    res: Response<IApiResponse<IBlogDoc>>,
    next: NextFunction
  ) => {
    const blog = new Blog(req.body)

    blog
      .save()
      .then((blog) => {
        return res.json({
          data: blog,
        })
      })
      .catch((error) => {
        next(error)
      })
  }
)

export { blogs }
