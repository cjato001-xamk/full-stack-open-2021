import {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} from 'apollo-server'
import { v4 as uuid } from 'uuid'
import mongoose from 'mongoose'
import {} from 'dotenv/config'
import jwt from 'jsonwebtoken'

import { seedDB } from './helpers/init.js'
import { Author } from './models/author.js'
import { Book } from './models/book.js'
import { User } from './models/user.js'

const typeDefs = gql`
  type Author {
    name: String!
    authorId: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    bookId: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(authorId: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.find({}).countDocuments()
    },
    authorCount: async () => {
      return await Author.find({}).countDocuments()
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []

        return await Book.find({
          authorId: author.authorId,
          genres: args.genre,
        })
          .populate('author')
          .exec()
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []

        return await Book.find({ authorId: author.authorId })
          .populate('author')
          .exec()
      }

      if (args.genre) {
        return await Book.find({ genres: args.genre }).populate('author').exec()
      }

      return await Book.find({}).populate('author').exec()
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.find({ authorId: root.authorId }).countDocuments()
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated!')
      }

      const authorExists = await Author.findOne({ name: args.author })
      const newAuthorId = uuid()

      if (!authorExists) {
        const author = new Author({
          name: args.author,
          authorId: newAuthorId,
        })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { args })
        }
      }

      const newBookId = uuid()

      const book = new Book({
        ...args,
        bookId: newBookId,
        authorId: newAuthorId,
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { args })
      }

      return book.populate('author')
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated!')
      }

      const author = await Author.findOne({ authorId: args.authorId })

      if (!author) {
        return null
      }

      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { authorId: author.authorId },
          { born: args.setBornTo },
          { new: true }
        )

        return updatedAuthor
      } catch (error) {
        throw new UserInputError(error.message, { args })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        userId: uuid(),
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Invalid credentials!')
      }

      const userForToken = {
        username: user.username,
        userId: user.userId,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findOne({ userId: decodedToken.userId })

      return { currentUser }
    }
  },
})

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME,
  })
  .then(() => {
    console.log('Connected to MongoDB')

    // Seed database with sample data if it's empty
    seedDB()

    server.listen().then(({ url }) => {
      console.log(`ApolloServer ready at ${url}.`)
    })
  })
  .catch((error) => {
    console.log('Error while connecting to MongoDB:', error.message)
  })
