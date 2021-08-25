import { IBlog } from '../interfaces/IBlog'

type BlogProps = {
  blog: IBlog
}

const Blog = ({ blog }: BlogProps): JSX.Element => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>
  )
}

export { Blog }
