import { IBlogMock, IAuthorBlogs, IAuthorLikes } from './mocker'

const countTotalLikes = (blogs: IBlogMock[]): number => {
  if (!blogs || blogs.length === 0) {
    return 0
  }

  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const getFavoriteBlog = (blogs: IBlogMock[]): IBlogMock | undefined => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }

  // Creates an array of all likes, gets max from
  // the array and finds a post with that max like count
  return blogs.find(
    (blog) => blog.likes === Math.max(...blogs.map((blog) => blog.likes))
  )
}

const getAuthorWithMostBlogs = (
  blogs: IBlogMock[]
): IAuthorBlogs | undefined => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }

  // Create an object with authors as keys and blog count as value
  const blogsPerAuthor = blogs.reduce(
    (acc, blog) => (
      (acc[blog.author] = acc[blog.author] || 0), acc[blog.author]++, acc
    ),
    {}
  )

  // Find the key with highest value
  const authorOfMostBlogs = Object.keys(blogsPerAuthor).reduce(
    (a, b) => (blogsPerAuthor[a] > blogsPerAuthor[b] ? a : b),
    ''
  )

  return { author: authorOfMostBlogs, blogs: blogsPerAuthor[authorOfMostBlogs] }
}

const getAuthorWithMostLikes = (
  blogs: IBlogMock[]
): IAuthorLikes | undefined => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }

  // Create an object with authors as keys and like count as value
  const likesPerAuthor = blogs.reduce((acc, blog) => {
    if (!acc[blog.author]) {
      acc[blog.author] = blog.likes
    } else {
      acc[blog.author] = acc[blog.author] + blog.likes
    }

    return acc
  }, {})

  // Find the key with highest value
  const authorOfMostLikes = Object.keys(likesPerAuthor).reduce(
    (acc, b) => (likesPerAuthor[acc] > likesPerAuthor[b] ? acc : b),
    ''
  )

  return { author: authorOfMostLikes, likes: likesPerAuthor[authorOfMostLikes] }
}

export {
  countTotalLikes,
  getFavoriteBlog,
  getAuthorWithMostBlogs,
  getAuthorWithMostLikes,
}
