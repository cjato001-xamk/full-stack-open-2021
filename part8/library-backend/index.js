import {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} from 'apollo-server-express'
import express from 'express'
import { v4 as uuid } from 'uuid'
import mongoose from 'mongoose'
import {} from 'dotenv/config'
import jwt from 'jsonwebtoken'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PubSub } from 'graphql-subscriptions'

import { seedDB } from './helpers/init.js'
import { Author } from './models/author.js'
import { Book } from './models/book.js'
import { User } from './models/user.js'

const pubsub = new PubSub()

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
    allGenres: [String]!
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

  type Subscription {
    bookAdded: Book
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
    allGenres: async () => {
      const genres = await Book.distinct('genres')

      // Filters out empty ones
      return genres.filter((genre) => genre)
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
        authorId: authorExists ? authorExists.authorId : newAuthorId,
      })

      try {
        await book.save()

        pubsub.publish('BOOK_ADDED', {
          bookAdded: book,
        })
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

// Integrate Apollo Server with Express
// in order to enable subscriptions
const app = express()
const httpServer = createServer(app)
const schema = makeExecutableSchema({ typeDefs, resolvers })

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: httpServer,
    path: '/graphql',
  }
)

const server = new ApolloServer({
  schema,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close()
          },
        }
      },
    },
  ],
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findOne({ userId: decodedToken.userId })

      return { currentUser }
    }
  },
})

// More required logic for integrating with Express
await server.start()
server.applyMiddleware({
  app,
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
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

    httpServer.listen(4000, () => {
      console.log(
        `Apollo Server ready at http://localhost:4000${server.graphqlPath}`
      )
    })
  })
  .catch((error) => {
    console.log('Databse or server failed to start:', error.message)
  })
