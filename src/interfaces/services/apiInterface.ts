import { AxiosInstance, AxiosResponse } from 'axios'

export interface ApiInterface {
  client: AxiosInstance
  invoke<T = any>(url: string): Promise<AxiosResponse<T>>
}
