import mongoose, { model, Schema, SchemaDefinitionProperty } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { IBlog, IBlogDoc } from '../interfaces/IBlog'

const blogSchemaFields: Record<keyof IBlog, SchemaDefinitionProperty> = {
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: {
    type: [String],
  },
}

const blogSchema = new Schema(blogSchemaFields, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret): void => {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
    },
  },
})

blogSchema.plugin(uniqueValidator)

const Blog = model<IBlogDoc>('Blog', blogSchema)

export { Blog }
