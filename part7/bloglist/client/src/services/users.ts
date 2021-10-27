import axios, { AxiosResponse } from 'axios'

import { IUser } from '../interfaces/IUser'
import { IApiResponse } from '../interfaces/IApiResponse'
import { config } from '../helpers/config'

const baseUrl = `${config.API_BASE_URL}/users`

const getAll = async (): Promise<AxiosResponse<IApiResponse<IUser[]>>> => {
  return await axios.get<IApiResponse<IUser[]>>(baseUrl)
}

const userService = {
  getAll,
}

export { userService }
