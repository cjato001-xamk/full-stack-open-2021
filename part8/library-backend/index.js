import { ApolloServer, gql } from 'apollo-server'
import { v4 as uuid } from 'uuid'
import mongoose from 'mongoose'
import {} from 'dotenv/config'

import { seedDB } from './helpers/init.js'
import { Author } from './models/author.js'
import { Book } from './models/book.js'

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB_NAME,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error while connecting to MongoDB:', error.message)
  })

// Seed database with sample data if it's empty
seedDB()

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(authorId: String!, setBornTo: Int!): Author
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
  },
  Author: {
    bookCount: async (root) => {
      return await Book.find({ authorId: root.authorId }).countDocuments()
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.author })
      const newAuthorId = uuid()

      if (!authorExists) {
        const author = new Author({
          name: args.author,
          authorId: newAuthorId,
        })
        await author.save()
      }

      const newBookId = uuid()

      const book = new Book({
        ...args,
        bookId: newBookId,
        authorId: newAuthorId,
      })
      await book.save()
      return book.populate('author')
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ authorId: args.authorId })

      if (!author) {
        return null
      }

      const updatedAuthor = await Author.findOneAndUpdate(
        { authorId: author.authorId },
        { born: args.setBornTo },
        { new: true }
      )

      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
