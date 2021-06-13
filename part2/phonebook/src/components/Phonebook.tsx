import React from 'react'
import { IPerson } from '../interfaces/IPerson'
import { INotification } from '../interfaces/INotification'
import { PhoneBookEntry } from './PhoneBookEntry'

type PhoneBookProps = {
  persons: IPerson[]
  filter: string
  refreshPersons: () => void
  setNotification: React.Dispatch<React.SetStateAction<INotification>>
}

const Phonebook = ({
  persons,
  filter,
  refreshPersons,
  setNotification,
}: PhoneBookProps): JSX.Element => {
  return (
    <table>
      <tbody>
        {persons
          .filter((person: IPerson) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person: IPerson) => (
            <PhoneBookEntry
              person={person}
              key={person.name}
              refreshPersons={refreshPersons}
              setNotification={setNotification}
            />
          ))}
      </tbody>
    </table>
  )
}

export { Phonebook }
