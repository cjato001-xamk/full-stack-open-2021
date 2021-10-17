import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl: string) => {
  const [resources, setResources] = useState<any[]>([])

  useEffect(() => {
    const request = axios.get(baseUrl)
    request.then((response) => setResources(response.data))
  }, [baseUrl])

  const create = async (content: any) => {
    const response = await axios.post(baseUrl, content)
    setResources([...resources, response.data])
  }

  const service = {
    create,
  }

  return [resources, service] as const
}

export { useResource }
