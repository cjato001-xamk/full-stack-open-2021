let PORT: string | number

if (process.env.NODE_ENV === 'development') {
  PORT = <string>process.env.DEVELOPMENT_PORT
} else if (process.env.NODE_ENV === 'test') {
  PORT = <string>process.env.TEST_PORT
} else {
  PORT = <string>process.env.PORT || 3001
}

const MONGODB_URI = <string>process.env.MONGODB_URI

let MONGODB_DB_NAME: string

if (process.env.NODE_ENV === 'test') {
  MONGODB_DB_NAME = 'test'
} else {
  MONGODB_DB_NAME = <string>process.env.MONGODB_DB_NAME
}

const NODE_ENV = <string>process.env.NODE_ENV
const JWT_SECRET = <string>process.env.JWT_SECRET

export const config = {
  PORT,
  MONGODB_URI,
  MONGODB_DB_NAME,
  NODE_ENV,
  JWT_SECRET,
}
