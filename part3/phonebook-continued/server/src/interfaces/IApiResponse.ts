export interface IApiResponse<T> {
  error?: {
    message: string
    stack?: unknown
  }
  message?: string
  data?: T
}
