export interface IBlog {
  id: string
  title: string
  author: string
  url: string
  likes: number
  user: {
    id: string
    username: string
    name: string
  }
  comments?: string[]
}

export type ICreateBlog = Pick<IBlog, 'title' | 'author' | 'url'>
