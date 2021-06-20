import mongoose from 'mongoose'

export interface IPerson {
  name: string
  number: number
}

// IPerson + Mongoose Document
export interface IPersonDoc extends IPerson, mongoose.Document {}
