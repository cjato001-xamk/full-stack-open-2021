import supertest from 'supertest'

import { IBlogDoc } from '../../interfaces/IBlog'
import { mockBlogs } from '../mock/blog'
import { createMockBlog } from '../helpers/blog'
import { mockUsers } from '../mock/user'
import { createMockUser } from '../helpers/user'
import { loginMockUserAndGetAuth } from '../helpers/auth'
import { app } from '../../app'
import { setupTestDatabase } from '../jest-db-setup'

const api = supertest(app)

setupTestDatabase('jest-api-blogs')

describe('/api/blogs', () => {
  describe('GET /', () => {
    beforeEach(async () => {
      for (const blog of mockBlogs) {
        await createMockBlog(blog, '6122d2af36ce1a2b56f93a9f')
      }
    })

    it('should return all blogs', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          expect(res.body.data).toHaveLength(mockBlogs.length)
        })
    })

    it('should return blogs with id instead of _id', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(mockBlogs.length)

          res.body.data.forEach((blog: IBlogDoc) => {
            expect(blog.id).toBeDefined()
            expect(blog._id).toBeUndefined()
          })
        })
    })
  })

  describe('POST /', () => {
    beforeEach(async () => {
      await createMockUser(mockUsers[0])
    })

    it('should require authorization', async () => {
      await api.post('/api/blogs').send(mockBlogs[0]).expect(401)
    })

    it('should add a blog', async () => {
      const auth = await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + auth?.token)
        .send(mockBlogs[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api.get('/api/blogs').expect((res) => {
        expect(res.body.data).toHaveLength(1)
      })
    })

    it('should add a blog with 0-likes when no likes given', async () => {
      const auth = await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockBlog: any = Object.assign({}, mockBlogs[0])
      delete mockBlog.likes

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + auth?.token)
        .send(mockBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
          expect(res.body.data[0].likes).toEqual(0)
        })
    })

    it('should not create a blog if no title given', async () => {
      const auth = await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockBlog: any = Object.assign({}, mockBlogs[0])
      delete mockBlog.title

      await api
        .post('/api/blogs')
        .send(mockBlog)
        .set('Authorization', 'Bearer ' + auth?.token)
        .expect(400)

      await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(0)
        })
    })

    it('should not create a blog if no url given', async () => {
      const auth = await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockBlog: any = Object.assign({}, mockBlogs[0])
      delete mockBlog.url

      await api
        .post('/api/blogs')
        .send(mockBlog)
        .set('Authorization', 'Bearer ' + auth?.token)
        .expect(400)

      await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(0)
        })
    })
  })

  describe('DELETE /:id', () => {
    it('should require authorization', async () => {
      await api.delete('/api/blogs/123456').expect(401)
    })

    it('should be possible to delete own blog', async () => {
      await createMockUser(mockUsers[0])

      const auth = await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + auth?.token)
        .send(mockBlogs[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const getBlogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
        })

      await api
        .delete(`/api/blogs/${getBlogs.body.data[0].id}`)
        .set('Authorization', 'Bearer ' + auth?.token)
        .expect(204)

      await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(0)
        })
    }, 10000)

    it('should not be possible to delete blog created by someone else', async () => {
      await createMockUser(mockUsers[0])
      const authUser1 = await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )

      await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + authUser1?.token)
        .send(mockBlogs[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const getBlogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
        })

      await createMockUser(mockUsers[1])
      const authUser2 = await loginMockUserAndGetAuth(
        api,
        mockUsers[1].username,
        mockUsers[1].password
      )

      await api
        .delete(`/api/blogs/${getBlogs.body.data[0].id}`)
        .set('Authorization', 'Bearer ' + authUser2?.token)
        .expect(401)

      await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
        })
    }, 10000)
  })

  describe('PATCH /:id/comments', () => {
    it('should push new comment', async () => {
      await createMockUser(mockUsers[0])

      const auth = await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )

      await api
        .post('/api/blogs')
        .send(mockBlogs[0])
        .set('Authorization', 'Bearer ' + auth?.token)
        .expect(200)

      const getBlogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
          expect(res.body.data[0].likes).toEqual(7)
        })

      await api
        .patch(`/api/blogs/${getBlogs.body.data[0].id}/comments`)
        .set('Authorization', 'Bearer ' + auth?.token)
        .send({ comment: 'test-comment' })
        .expect(204)

      await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
          expect(res.body.data[0].comments).toEqual(['test-comment'])
        })
    })
  })

  describe('PATCH /:id', () => {
    it('should update likes', async () => {
      await createMockUser(mockUsers[0])

      const auth = await loginMockUserAndGetAuth(
        api,
        mockUsers[0].username,
        mockUsers[0].password
      )

      await api
        .post('/api/blogs')
        .send(mockBlogs[0])
        .set('Authorization', 'Bearer ' + auth?.token)
        .expect(200)

      const getBlogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
          expect(res.body.data[0].likes).toEqual(7)
        })

      await api
        .patch(`/api/blogs/${getBlogs.body.data[0].id}`)
        .set('Authorization', 'Bearer ' + auth?.token)
        .send({ likes: 11 })
        .expect(204)

      await api
        .get('/api/blogs')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1)
          expect(res.body.data[0].likes).toEqual(11)
        })
    })
  })
})
