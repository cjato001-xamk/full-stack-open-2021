import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { RootState } from '../../store'
import { likeBlog, commentBlog } from '../../reducers/blogReducer'

import { LikeButton } from '../LikeButton'
import { RemoveBlogButton } from '../RemoveBlogButton'

const Blog = (): JSX.Element => {
  const dispatch = useDispatch()

  const { id: blogId } = useParams<{ id: string }>()

  const blog = useSelector((state: RootState) =>
    state.blogs.blogs.find((blog) => blog.id === blogId)
  )
  const user = useSelector((state: RootState) => state.users.loggedInUser)

  const isLiking = useSelector((state: RootState) =>
    state.blogs.liking.some((bId) => bId === blogId)
  )

  const isCommenting = useSelector((state: RootState) =>
    state.blogs.commenting.some((bId) => bId === blogId)
  )

  const [comment, setComment] = useState<string>('')

  if (!blog) {
    return (
      <>
        <p>Invalid blog!</p>
      </>
    )
  }

  const like = (): void => {
    dispatch(likeBlog(blog))
  }

  const commentHandler = (): void => {
    dispatch(commentBlog(blog, comment))
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        Likes: {blog.likes} <LikeButton like={like} isLiking={isLiking} />
      </p>
      <p>added by {blog.user.name}</p>

      <h3>Comments</h3>

      <input
        type='text'
        value={comment}
        onChange={(event): void => setComment(event.target.value)}
      />
      <button onClick={commentHandler} disabled={isCommenting}>
        add comment
      </button>

      <ul>
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      {user?.id && user.id === blog.user.id && <RemoveBlogButton blog={blog} />}
    </div>
  )
}

export { Blog }
