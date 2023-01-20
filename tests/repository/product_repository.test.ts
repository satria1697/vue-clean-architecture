import 'reflect-metadata'
import { AxiosResponse } from 'axios'
import { describe, expect, it } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { ApiInterface } from '../../src/interfaces/services/apiInterface'
import { ProductRepository } from '../../src/repositories/productRepository'
import { getProductResponse } from '../helper/product'

describe('product_repository', () => {
  const api = mock<ApiInterface>()
  const productRepository = new ProductRepository(api)
  it('get_data', async () => {
    const axiosResponse: AxiosResponse = {
      data: getProductResponse(),
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
