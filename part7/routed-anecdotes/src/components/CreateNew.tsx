import { useField } from '../hooks'

type CreateNewProps = {
  addNew: any
}

const CreateNew = ({ addNew }: CreateNewProps) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')

  const handleSubmit = (event: any) => {
    event.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export { CreateNew }
