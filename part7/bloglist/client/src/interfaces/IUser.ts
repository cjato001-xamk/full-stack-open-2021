import { IBlog } from './IBlog'

export interface IUser {
  id?: string
  token?: string
  username: string
  name: string
  blogs?: Pick<IBlog, 'url' | 'title' | 'author' | 'id'>[]
}
