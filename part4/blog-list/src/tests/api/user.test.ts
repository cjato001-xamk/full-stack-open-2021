import supertest from 'supertest'

import { IUserDoc } from '../../interfaces/IUser'
import { mockUsers } from '../mock/user'
import { createMockUser } from '../helpers/user'
import { app } from '../../app'
import { setupTestDatabase } from '../jest-db-setup'

const api = supertest(app)

setupTestDatabase('jest-api-users')

describe('/api/users', () => {
  describe('GET /', () => {
    beforeEach(async () => {
      for (const user of mockUsers) {
        await createMockUser(user)
      }
    })

    it('should return all users', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.data).toHaveLength(mockUsers.length)
        })
    })

    it('should return users with id instead of _id', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(mockUsers.length)

          res.body.data.forEach((user: IUserDoc) => {
            expect(user.id).toBeDefined()
            expect(user._id).toBeUndefined()
          })
        })
    })
  })

  describe('POST /', () => {
    it('should add a user', async () => {
      await api
        .post('/api/users')
        .send(mockUsers[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api.get('/api/users').expect((res) => {
        expect(res.body.data).toHaveLength(1)
      })
    })

    it('should not allow creating a user if username is already taken', async () => {
      await api.post('/api/users').send(mockUsers[0]).expect(200)

      await api
        .post('/api/users')
        .send(mockUsers[0])
        .expect(409)
        .expect((res) => {
          expect(res.body.error.message).toEqual('Username already exists.')
        })
    })

    it('should not create a user if no username given', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockUser: any = Object.assign({}, mockUsers[0])
      delete mockUser.username

      await api
        .post('/api/users')
        .send(mockUser)
        .expect(400)
        .expect((res) => {
          expect(res.body.error.message).toEqual('Username is required.')
        })

      await api.get('/api/users').expect((res) => {
        expect(res.body.data).toHaveLength(0)
      })
    })

    it('should not create a user if no name given', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockUser: any = Object.assign({}, mockUsers[0])
      delete mockUser.name

      await api
        .post('/api/users')
        .send(mockUser)
        .expect(400)
        .expect((res) => {
          expect(res.body.error.message).toEqual('Name is required.')
        })

      await api.get('/api/users').expect((res) => {
        expect(res.body.data).toHaveLength(0)
      })
    })

    it('should not create a user if no password given', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockUser: any = Object.assign({}, mockUsers[0])
      delete mockUser.password

      await api
        .post('/api/users')
        .send(mockUser)
        .expect(400)
        .expect((res) => {
          expect(res.body.error.message).toEqual(
            'Password is required and must have at least three characters.'
          )
        })

      await api.get('/api/users').expect((res) => {
        expect(res.body.data).toHaveLength(0)
      })
    })

    it('should not create a user if too short password given', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockUser: any = Object.assign({}, mockUsers[0])
      mockUser.password = 'pw'

      await api
        .post('/api/users')
        .send(mockUser)
        .expect(400)
        .expect((res) => {
          expect(res.body.error.message).toEqual(
            'Password is required and must have at least three characters.'
          )
        })

      await api.get('/api/users').expect((res) => {
        expect(res.body.data).toHaveLength(0)
      })
    })
  })

  describe('DELETE /:id', () => {
    beforeEach(async () => {
      for (const user of mockUsers) {
        await createMockUser(user)
      }
    })

    it('should delete a user', async () => {
      const getUsers = await api
        .get('/api/users')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(mockUsers.length)
        })

      await api.delete(`/api/users/${getUsers.body.data[1].id}`).expect(204)

      await api
        .get('/api/users')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(mockUsers.length - 1)
        })
    })
  })
})
