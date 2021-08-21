import { blogs, IBlogMock } from './mocker'
import {
  countTotalLikes,
  getFavoriteBlog,
  getAuthorWithMostBlogs,
  getAuthorWithMostLikes,
} from './blogHelper'

describe('Blog', () => {
  describe('total likes', () => {
    it('should return zero for an empty list', () => {
      const mockBlogs: [] = []

      const result = countTotalLikes(mockBlogs)
      expect(result).toBe(0)
    })

    it('should return correct like count when only one blog given', () => {
      const mockBlogs: IBlogMock[] = blogs.filter(
        (blog) => blog._id === '5a422a851b54a676234d17f7'
      )

      const result = countTotalLikes(mockBlogs)
      expect(result).toBe(7)
    })

    it('should return correct like count for a list of blogs', () => {
      const mockBlogs: IBlogMock[] = blogs

      const result = countTotalLikes(mockBlogs)
      expect(result).toBe(36)
    })
  })

  describe('favorite blog', () => {
    it('should return undefined for an empty list', () => {
      const mockBlogs: [] = []

      const result = getFavoriteBlog(mockBlogs)
      expect(result).toBe(undefined)
    })

    it('should return a blog with most likes when given a list of blogs', () => {
      const mockBlogs: IBlogMock[] = blogs

      const result = getFavoriteBlog(mockBlogs)
      expect(result?._id).toBe('5a422b3a1b54a676234d17f9')
    })
  })

  describe('most blogs', () => {
    it('should return undefined for an empty list', () => {
      const mockBlogs: [] = []

      const result = getAuthorWithMostBlogs(mockBlogs)
      expect(result).toBe(undefined)
    })

    it('should return an author with most blogs when given a list of blogs', () => {
      const mockBlogs: IBlogMock[] = blogs

      const result = getAuthorWithMostBlogs(mockBlogs)
      expect(result).toStrictEqual({ author: 'Robert C. Martin', blogs: 3 })
    })
  })

  describe('most likes', () => {
    it('should return undefined for an empty list', () => {
      const mockBlogs: [] = []

      const result = getAuthorWithMostLikes(mockBlogs)
      expect(result).toBe(undefined)
    })

    it('should return an author with most likes when given a list of blogs', () => {
      const mockBlogs: IBlogMock[] = blogs

      const result = getAuthorWithMostLikes(mockBlogs)
      expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    })
  })
})
