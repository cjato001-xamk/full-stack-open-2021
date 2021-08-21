import express, { Request, Response } from 'express'

import { IApiResponse } from '../../interfaces/IApiResponse'
import { IBlogDoc } from '../../interfaces/IBlog'
import { Blog } from '../../models/blog'

const blogs = express.Router()

blogs.get(
  '/',
  async (req: Request, res: Response<IApiResponse<IBlogDoc[]>>) => {
    const blogs = await Blog.find({})

    return res.json({
      data: blogs,
    })
  }
)

blogs.get(
  '/:id',
  async (req: Request, res: Response<IApiResponse<IBlogDoc>>) => {
    const { id } = req.params

    const blog = await Blog.findOne({ _id: id })

    if (blog) {
      return res.json({
        data: blog,
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
  async (req: Request, res: Response<IApiResponse<null>>) => {
    await Blog.findByIdAndRemove(req.params.id)

    return res.status(204).json({})
  }
)

blogs.post('/', async (req: Request, res: Response<IApiResponse<IBlogDoc>>) => {
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()

  return res.json({
    data: savedBlog,
  })
})

blogs.patch(
  '/:id',
  async (req: Request, res: Response<IApiResponse<IBlogDoc>>) => {
    const { id } = req.params
    await Blog.findByIdAndUpdate(id, req.body)

    return res.status(204).json({})
  }
)

export { blogs }
