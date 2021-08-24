import supertest from 'supertest'

import { mockUsers } from '../mock/user'
import { createMockUser } from '../helpers/user'
import { loginMockUserAndGetAuth } from '../helpers/auth'
import { app } from '../../app'
import { setupTestDatabase } from '../jest-db-setup'

const api = supertest(app)

setupTestDatabase('jest-api-auth')

describe('/api/auth', () => {
  describe('POST /login', () => {
    beforeEach(async () => {
      await createMockUser(mockUsers[0])
    })

    it('should login and return token', async () => {
      await api.get('/api/users').expect((res) => {
        expect(res.body.data).toHaveLength(1)
      })

      await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )
    })

    it('should return an error if username is missing', async () => {
      await api
        .post('/api/auth/login')
        .send({
          password: mockUsers[0].password,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.error.message).toEqual('Username is required.')
        })
    })

    it('should return an error if password is missing', async () => {
      await api
        .post('/api/auth/login')
        .send({
          username: mockUsers[0].username,
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.error.message).toEqual('Password is required.')
        })
    })

    it('should return an error if an invalid username is given', async () => {
      await api
        .post('/api/auth/login')
        .send({
          username: 'invalid',
          password: mockUsers[0].password,
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.error.message).toEqual(
            'Invalid username or password.'
          )
        })
    })

    it('should return an error if an invalid password is given', async () => {
      await api
        .post('/api/auth/login')
        .send({
          username: mockUsers[0].username,
          password: 'invalid',
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.error.message).toEqual(
            'Invalid username or password.'
          )
        })
    })
  })
})
