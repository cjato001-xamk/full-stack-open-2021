declare namespace Express {
  export interface Request {
    token?: string | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decodedToken?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any
  }
}
