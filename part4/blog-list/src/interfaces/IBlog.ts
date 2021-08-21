import mongoose from 'mongoose'

export interface IBlog {
  title: string
  author: string
  url: string
  likes: number
}

// IBlog + Mongoose Document
export interface IBlogDoc extends IBlog, mongoose.Document {}
