import { useState } from 'react'

import { IBlog } from '../interfaces/IBlog'

type BlogProps = {
  blog: IBlog
}

const Blog = ({ blog }: BlogProps): JSX.Element => {
  const [showBlogDetails, setShowBlogDetails] = useState<boolean>(false)

  return (
    <div
      style={{
        padding: 10,
        border: '1px solid #ddd',
        marginBottom: 2,
      }}
    >
      {blog.title} {blog.author}{' '}
      <button onClick={(): void => setShowBlogDetails(!showBlogDetails)}>
        {showBlogDetails ? 'Hide' : 'Show'} details
      </button>
      {showBlogDetails && (
        <ul>
          <li>{blog.url}</li>
          <li>Likes: {blog.likes}</li>
          <li>{blog.user.name}</li>
        </ul>
      )}
    </div>
  )
}

export { Blog }
