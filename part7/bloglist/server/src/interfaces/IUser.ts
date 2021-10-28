import mongoose from 'mongoose'

import { IBlogClient } from './IBlog'

export interface IUser {
  username: string
  name: string
  passwordHash: string
  blogs?: string[]
}

// IUser + Mongoose Document
export interface IUserDoc extends IUser, mongoose.Document {}

export interface IUserClient {
  id?: string
  token?: string
  username: string
  name: string
  blogs?: Omit<IBlogClient, 'id' | 'likes'>[]
}
