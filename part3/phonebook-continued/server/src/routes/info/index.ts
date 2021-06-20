import express, { Request, Response, NextFunction } from 'express'

import { Person } from '../../models/person'

const info = express.Router()

info.get('/', (req: Request, res: Response, next: NextFunction) => {
  Person.find({})
    .then((persons) => {
      return res.send(
        `Phonebook has info for ${
          persons.length
        } people.<br /><br />${new Date().toString()}`
      )
    })
    .catch((error) => {
      next(error)
    })
})

export { info }
