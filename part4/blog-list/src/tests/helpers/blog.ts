import mongoose from 'mongoose'

import { Blog } from '../../models/blog'
import { IMockBlog } from '../mock/blog'

const createMockBlog = async (
  blog: IMockBlog,
  userId: string
): Promise<void> => {
  const mockBlog = Object.assign({}, blog)

  const blogObject = new Blog({
    ...mockBlog,
    user: mongoose.Types.ObjectId(userId),
  })
  await blogObject.save()
}

export { createMockBlog }
