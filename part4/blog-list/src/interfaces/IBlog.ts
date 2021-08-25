import mongoose from 'mongoose'

export interface IBlog {
  title: string
  author: string
  url: string
  likes: number
  user: string
}

// IBlog + Mongoose Document
export interface IBlogDoc extends IBlog, mongoose.Document {}

export interface IBlogClient {
  id?: string
  title: string
  author: string
  url: string
  likes: number
  user: string
}
