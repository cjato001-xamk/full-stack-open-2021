import express, { Request, Response, NextFunction } from 'express'

import { IApiResponse } from '../../interfaces/IApiResponse'
import { IPersonDoc } from '../../interfaces/IPerson'
import { Person } from '../../models/person'

const persons = express.Router()

persons.get(
  '/',
  (
    req: Request,
    res: Response<IApiResponse<IPersonDoc[]>>,
    next: NextFunction
  ) => {
    Person.find({})
      .then((persons) => {
        return res.json({
          data: persons,
        })
      })
      .catch((error) => {
        next(error)
      })
  }
)

persons.get(
  '/:id',
  async (
    req: Request,
    res: Response<IApiResponse<IPersonDoc>>,
    next: NextFunction
  ) => {
    const { id } = req.params

    Person.findOne({ _id: id })
      .then((person) => {
        if (person) {
          return res.json({
            data: person,
          })
        } else {
          return res.status(404).json({
            error: { message: 'Person with the requested id does not exist.' },
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  }
)

persons.delete(
  '/:id',
  (req: Request, res: Response<IApiResponse<null>>, next: NextFunction) => {
    Person.findByIdAndRemove(req.params.id)
      .then(() => {
        return res.status(200).json({})
      })
      .catch((error) => {
        next(error)
      })
  }
)

persons.post(
  '/',
  async (
    req: Request,
    res: Response<IApiResponse<IPersonDoc>>,
    next: NextFunction
  ) => {
    const { body } = req

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person
      .save()
      .then((person) => {
        return res.json({
          data: person,
        })
      })
      .catch((error) => {
        next(error)
      })
  }
)

persons.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  const { body } = req

  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((person) => {
      return res.json({
        data: person,
      })
    })
    .catch((error) => {
      next(error)
    })
})

export { persons }
