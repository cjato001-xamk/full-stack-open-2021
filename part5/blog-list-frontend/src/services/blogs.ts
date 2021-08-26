import axios, { AxiosResponse } from 'axios'

import { authService } from './auth'
import { IBlog, ICreateBlog } from '../interfaces/IBlog'
import { IApiResponse } from '../interfaces/IApiResponse'

const baseUrl = `${process.env.REACT_APP_API_END_POINT}/blogs`

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

const blogService = {
  getAll,
  create,
  like,
}

export { blogService }
