import { ProductResponse } from '../../entities/product'

//abstract
export interface ProductRepositoryInterface {
  getProductData(): Promise<ProductResponse>
}
