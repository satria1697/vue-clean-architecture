import 'reflect-metadata'
import { AxiosResponse } from 'axios'
import { describe, expect, it } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { ProductResponse } from '../../src/entities/product'
import { ApiInterface } from '../../src/interfaces/services/apiInterface'
import { ProductRepository } from '../../src/repositories/productRepository'

describe('product_repository', () => {
  const api = mock<ApiInterface>()
  const productRepository = new ProductRepository(api)
  const productResponse: ProductResponse = {
    products: [
      {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile which is nothing like apple',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Apple',
        category: 'smartphones',
        thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
        images: [
          'https://i.dummyjson.com/data/products/1/1.jpg',
          'https://i.dummyjson.com/data/products/1/2.jpg',
          'https://i.dummyjson.com/data/products/1/3.jpg',
          'https://i.dummyjson.com/data/products/1/4.jpg',
          'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
        ]
      }
    ],
    limit: 10,
    skip: 0,
    total: 100
  }
  it('get_data', async () => {
    const axiosResponse: AxiosResponse = {
      data: productResponse,
      config: {},
      status: 200,
      statusText: '',
      headers: {}
    }
    api.invoke.mockResolvedValue(axiosResponse)
    const res = await productRepository.getProductData()
    expect(res.products.length).toEqual(1)
    expect(res.products[0].id).toEqual(1)
  })
})
