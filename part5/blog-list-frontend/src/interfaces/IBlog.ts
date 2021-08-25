export interface IBlog {
  id: string
  title: string
  author: string
  url: string
  likes: number
  user: string
}

export type ICreateBlog = Pick<IBlog, 'title' | 'author' | 'url'>
