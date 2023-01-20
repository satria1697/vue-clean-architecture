import axios, { AxiosResponse } from 'axios'

import { ApiInterface } from '../interfaces/services/apiInterface'

export class Api implements ApiInterface {
  client = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 9000
  })
  async invoke<T = any>(url: string): Promise<AxiosResponse<T>> {
    return await this.client.request({
      url
    })
  }
}
