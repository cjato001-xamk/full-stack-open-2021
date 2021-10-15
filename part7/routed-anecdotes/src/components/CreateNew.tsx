import { useState } from 'react'

type CreateNewProps = {
  addNew: any
}

const CreateNew = ({ addNew }: CreateNewProps) => {
  const [content, setContent] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [info, setInfo] = useState<string>('')

  const handleSubmit = (event: any) => {
    event.preventDefault()

    addNew({
      content,
      author,
      info,
      votes: 0,
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name='info'
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export { CreateNew }
