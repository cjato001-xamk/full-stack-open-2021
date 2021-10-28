import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { RootState } from '../../store'
import { likeBlog } from '../../reducers/blogReducer'

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

      {user?.id && user.id === blog.user.id && <RemoveBlogButton blog={blog} />}
    </div>
  )
}

export { Blog }
