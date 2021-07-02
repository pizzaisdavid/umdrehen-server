
import axios from 'axios'

import { Backend } from '../src/client'

export class Http implements Backend.Http {
  async delete<T> (
    url: string
  ): Promise<T> {
    const result = await axios.delete<T>(url)
    return result.data
  }

  async get<T> (
    url: string
  ): Promise<T> {
    const result = await axios.get<T>(url)
    return result.data
  }

  async post<T> (
    url: string,
    body: any
  ): Promise<T> {
    const result = await axios.post<T>(url, body)
    return result.data
  }
}
