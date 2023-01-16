import { inject, injectable } from 'tsyringe'

import { ProductResponse } from '../entities/product'
import { ProductRepositoryInterface } from '../interfaces/repositories/productRepositoryInterface'
import { Api } from '../services/api'

@injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(@inject('ApiService') private apiService: Api) {}

  public async getProductData(): Promise<ProductResponse> {
    const response = await this.apiService.invoke('products')
    return response.data
  }
}
