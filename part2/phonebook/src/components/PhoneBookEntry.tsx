import { IPerson } from '../interfaces/IPerson'
import { INotification } from '../interfaces/INotification'
import { personService } from '../services/personService'

type PhoneBookEntryProps = {
  person: IPerson
  refreshPersons: () => void
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const PhoneBookEntry = ({
  person,
  refreshPersons,
  setNotification,
}: PhoneBookEntryProps): JSX.Element => {
  const handleDelete = (person: IPerson): void => {
    personService
      .deletePerson(person.id)
      .then(() => {
        setNotification({
          message: `Deleted "${person.name}".`,
          type: 'success',
        })
        refreshPersons()
      })
      .catch(() => {
        setNotification({
          message: `Failed to delete "${person.name}".`,
          type: 'error',
        })
      })
  }

  return (
    <tr key={person.name}>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button
          onClick={(): void => {
            if (
              window.confirm(
                `Are you sure you wish to delete "${person.name}"?`
              )
            ) {
              handleDelete(person)
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export { PhoneBookEntry }
