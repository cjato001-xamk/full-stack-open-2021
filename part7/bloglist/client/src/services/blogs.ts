import axios, { AxiosResponse } from 'axios'

import { authService } from './auth'
import { IBlog, ICreateBlog } from '../interfaces/IBlog'
import { IApiResponse } from '../interfaces/IApiResponse'
import { config } from '../helpers/config'

const baseUrl = `${config.API_BASE_URL}/blogs`

const getAll = async (): Promise<AxiosResponse<IApiResponse<IBlog[]>>> => {
  return await axios.get<IApiResponse<IBlog[]>>(baseUrl)
}

const create = async (
  blog: ICreateBlog
): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
  return await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

const like = async (update: {
  id: string
  likes: number
}): Promise<AxiosResponse<IApiResponse<IBlog>>> => {
  return await axios.patch(
    `${baseUrl}/${update.id}`,
    { likes: update.likes },
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  )
}

const comment = async ({
  id,
  comment,
}: {
  id: string
  comment: string
}): Promise<AxiosResponse<IApiResponse<null>>> => {
  return await axios.patch(
    `${baseUrl}/${id}/comments`,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  )
}

const remove = async (
  id: string
): Promise<AxiosResponse<IApiResponse<null>>> => {
  return await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  })
}

const blogService = {
  getAll,
  create,
  like,
  comment,
  remove,
}

export { blogService }
