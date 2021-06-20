import axios, { AxiosResponse } from 'axios'
import { IApiResponse } from '../interfaces/IApiResponse'
import { IPerson, ICreatePerson } from '../interfaces/IPerson'

const baseUrl = `${process.env.REACT_APP_API_END_POINT!}/persons`

const getPersons = (): Promise<AxiosResponse<IApiResponse<IPerson[]>>> => {
  return axios.get<IApiResponse<IPerson[]>>(baseUrl)
}

const createPerson = (
  person: ICreatePerson
): Promise<AxiosResponse<IApiResponse<IPerson>>> => {
  return axios.post(baseUrl, person)
}

const updatePerson = (
  id: number,
  person: IPerson
): Promise<AxiosResponse<IApiResponse<IPerson>>> => {
  return axios.put(`${baseUrl}/${id}`, person)
}

const deletePerson = (id: number): Promise<AxiosResponse<null>> => {
  return axios.delete(`${baseUrl}/${id}`)
}

const personService = { getPersons, createPerson, updatePerson, deletePerson }

export { personService }
