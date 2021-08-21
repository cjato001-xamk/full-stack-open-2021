import supertest from 'supertest'

import { Blog } from '../../models/blog'
import { IBlogDoc } from '../../interfaces/IBlog'
import { app } from '../../app'
import { setupTestDatabase } from '../jest-db-setup'

const api = supertest(app)

const mockData = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

setupTestDatabase('jest-api-blogs')

describe('/api/blogs', () => {
  describe('GET /', () => {
    beforeEach(async () => {
      await Blog.insertMany(mockData)
    })

    it('should return all blogs', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.data).toHaveLength(mockData.length)
    })

    it('should return blogs with id instead of _id', async () => {
      const response = await api.get('/api/blogs').expect(200)

      expect(response.body.data).toHaveLength(mockData.length)

      response.body.data.forEach((blog: IBlogDoc) => {
        expect(blog.id).toBeDefined()
        expect(blog._id).toBeUndefined()
      })
    })
  })

  describe('POST /', () => {
    it('should add a blog', async () => {
      await api
        .post('/api/blogs')
        .send(mockData[0])
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      expect(response.body.data).toHaveLength(1)
    })

    it('should add a blog with 0-likes when no likes given', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockBlog: any = Object.assign({}, mockData[0])
      delete mockBlog.likes

      await api
        .post('/api/blogs')
        .send(mockBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0].likes).toEqual(0)
    })

    it('should not create a blog if no title given', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockBlog: any = Object.assign({}, mockData[0])
      delete mockBlog.title

      await api.post('/api/blogs').send(mockBlog).expect(400)

      const response = await api.get('/api/blogs')

      expect(response.body.data).toHaveLength(0)
    })

    it('should not create a blog if no url given', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockBlog: any = Object.assign({}, mockData[0])
      delete mockBlog.url

      await api.post('/api/blogs').send(mockBlog).expect(400)

      const response = await api.get('/api/blogs')

      expect(response.body.data).toHaveLength(0)
    })
  })

  describe('DELETE /:id', () => {
    it('should delete a blog', async () => {
      await Blog.insertMany(mockData)

      const getBlogs = await api.get('/api/blogs').expect(200)

      expect(getBlogs.body.data).toHaveLength(mockData.length)

      await api.delete(`/api/blogs/${getBlogs.body.data[3].id}`).expect(204)

      const getBlogsAfterDelete = await api.get('/api/blogs').expect(200)

      expect(getBlogsAfterDelete.body.data).toHaveLength(mockData.length - 1)
    })
  })

  describe('PATCH /:id', () => {
    it('should update likes', async () => {
      await api.post('/api/blogs').send(mockData[0]).expect(200)

      const getBlogs = await api.get('/api/blogs')

      expect(getBlogs.body.data[0].likes).toEqual(7)

      await api
        .patch(`/api/blogs/${getBlogs.body.data[0].id}`)
        .send({ likes: 11 })
        .expect(204)

      const getBlogsAfterPatch = await api.get('/api/blogs').expect(200)

      expect(getBlogsAfterPatch.body.data[0].likes).toEqual(11)
    })
  })
})
