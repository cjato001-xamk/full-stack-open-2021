export interface IBlog {
  id: string
  title: string
  author: string
  url: string
  likes: number
  user: {
    username: string
    name: string
  }
}

export type ICreateBlog = Pick<IBlog, 'title' | 'author' | 'url'>
