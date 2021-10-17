import { useField, useResource } from '../hooks'

const Persons = () => {
  const { reset: resetName, ...name } = useField('text')
  const { reset: resetNumber, ...number } = useField('text')

  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handlePersonSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })

    resetName()
    resetNumber()
  }

  return (
    <>
      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((person: { id: string; name: string; number: string }) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  )
}

export { Persons }
