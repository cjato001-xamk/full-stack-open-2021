import { useField, useResource } from '../hooks'

const Notes = () => {
  const { reset: resetNote, ...note } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')

  const handleNoteSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    noteService.create({ content: note.value })

    resetNote()
  }

  return (
    <>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...note} />
        <button>create</button>
      </form>
      {notes.map((note: { content: string; id: string }) => (
        <p key={note.id}>{note.content}</p>
      ))}
    </>
  )
}

export { Notes }
