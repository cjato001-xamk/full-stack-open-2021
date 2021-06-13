import { INotification } from '../interfaces/INotification'
import { IPerson } from '../interfaces/IPerson'
import { personService } from '../services/personService'

type CreatePersonProps = {
  newName: string
  setNewName: React.Dispatch<React.SetStateAction<string>>
  newNumber: string
  setNewNumber: React.Dispatch<React.SetStateAction<string>>
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
  persons: IPerson[]
  refreshPersons: () => void
}

const CreatePersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setNotification,
  persons,
  refreshPersons,
}: CreatePersonProps): JSX.Element => {
  const addPerson = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const personExists = persons.filter(
      (person: IPerson) => person.name === newName
    )[0]
    const newPerson = { name: newName, number: newNumber }

    if (!personExists) {
      personService
        .createPerson(newPerson)
        .then(() => {
          setNotification({
            message: 'Created person.',
            type: 'success',
          })

          refreshPersons()

          setNewName('')
          setNewNumber('')
        })
        .catch(() => {
          setNotification({
            message: 'Failed to create person.',
            type: 'error',
          })
        })
    } else {
      if (
        window.confirm(
          `Are you sure you wish to update "${personExists.name}"?`
        )
      ) {
        personService
          .updatePerson(personExists.id, {
            ...newPerson,
            id: personExists.id,
          })
          .then(() => {
            setNotification({
              message: 'Updated person.',
              type: 'success',
            })

            refreshPersons()

            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setNotification({
              message: 'Failed to update person.',
              type: 'error',
            })
          })
      }
    }
  }

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  )
}

export { CreatePersonForm }
