import axios, { AxiosResponse } from 'axios'

import { IUser } from '../interfaces/IUser'
import { IApiResponse } from '../interfaces/IApiResponse'
import { config } from '../helpers/config'

const baseUrl = `${config.API_BASE_URL}/auth`

const login = async (credentials: {
  username: string
  password: string
}): Promise<AxiosResponse<IApiResponse<IUser>>> => {
  return await axios.post(`${baseUrl}/login`, credentials)
}

const logout = (): void => {
  window.localStorage.clear()
}

const setUser = (user: IUser): void => {
  window.localStorage.setItem('user', JSON.stringify(user))
}

const getUser = (): IUser | null => {
  const user = window.localStorage.getItem('user')

  if (user) {
    return JSON.parse(user)
  }

  return null
}

const getToken = (): string | null => {
  const user = getUser()

  if (user && user.token) {
    return user.token
  }

  return null
}

const authService = {
  login,
  logout,
  setUser,
  getUser,
  getToken,
}

export { authService }
