import { Author } from '../models/author.js'
import { Book } from '../models/book.js'
import { User } from '../models/user.js'

const authorsData = [
  {
    name: 'Robert Martin',
    authorId: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    authorId: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    authorId: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky',
    authorId: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz',
    authorId: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

const booksData = [
  {
    title: 'Clean Code',
    published: 2008,
    authorId: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    bookId: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    authorId: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    bookId: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    authorId: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    bookId: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    authorId: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    bookId: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    authorId: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    bookId: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    authorId: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    bookId: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    authorId: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    bookId: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

const usersData = [
  { userId: 'd7a14056-9a67-4903-afe7-af6d51367a43', username: 'aramis' },
]

// Seed database if it's empty
const seedDB = async () => {
  const authors = await Author.find({})
  const books = await Book.find({})
  const users = await User.find({})

  if (!authors.length && !books.length && !users.length) {
    try {
      await Author.create(authorsData)
      await Book.create(booksData)
      await User.create(usersData)

      console.log('Database seeded.')
    } catch {
      console.log('Failed to seed database')
    }
  }
}

export { seedDB }
