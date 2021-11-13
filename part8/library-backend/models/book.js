import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
    },
    published: {
      type: Number,
    },
    authorId: {
      type: String,
    },
    genres: [{ type: String }],
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)

schema.plugin(uniqueValidator)

schema.virtual('author', {
  ref: 'Author',
  localField: 'authorId',
  foreignField: 'authorId',
  justOne: true,
})

const Book = mongoose.model('Book', schema)

export { Book }
