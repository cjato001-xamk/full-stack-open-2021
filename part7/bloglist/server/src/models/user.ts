import mongoose, { model, Schema, SchemaDefinitionProperty } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { IUser, IUserDoc } from '../interfaces/IUser'

const userSchemaFields: Record<keyof IUser, SchemaDefinitionProperty> = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
}

const userSchema = new Schema(userSchemaFields, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret): void => {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
      delete ret.passwordHash
    },
  },
})

userSchema.plugin(uniqueValidator)

const User = model<IUserDoc>('User', userSchema)

export { User }
