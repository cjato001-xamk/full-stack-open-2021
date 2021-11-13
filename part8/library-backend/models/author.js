import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator)

const Author = mongoose.model('Author', schema)

export { Author }
