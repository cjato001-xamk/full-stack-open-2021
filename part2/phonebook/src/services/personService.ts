import axios, { AxiosResponse } from 'axios'
import { IPerson, ICreatePerson } from '../interfaces/IPerson'

const baseUrl = 'http://localhost:3012/persons'

const getPersons = (): Promise<IPerson[]> => {
  const request = axios.get<IPerson[]>(baseUrl)
  return request.then((response) => response.data)
}

const createPerson = (
  person: ICreatePerson
): Promise<AxiosResponse<IPerson>> => {
  const request = axios.post(baseUrl, person)
  return request.then((response) => response.data)
}

const updatePerson = (
  id: number,
  person: IPerson
): Promise<AxiosResponse<IPerson>> => {
  const request = axios.put(`${baseUrl}/${id}`, person)
  return request.then((response) => response.data)
}

const deletePerson = (id: number): Promise<AxiosResponse<IPerson>> => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const personService = { getPersons, createPerson, updatePerson, deletePerson }

export { personService }
