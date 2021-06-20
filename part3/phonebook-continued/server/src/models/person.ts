import { model, Schema, SchemaDefinitionProperty } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import { IPerson, IPersonDoc } from '../interfaces/IPerson'

const personSchemaFields: Record<keyof IPerson, SchemaDefinitionProperty> = {
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  },
}

const personSchema = new Schema(personSchemaFields, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret): void => {
      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v
    },
  },
})

personSchema.plugin(uniqueValidator)

const Person = model<IPersonDoc>('Person', personSchema)

export { Person }
