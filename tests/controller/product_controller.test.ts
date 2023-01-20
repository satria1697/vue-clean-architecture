import 'reflect-metadata'
import { createPinia, setActivePinia } from 'pinia'
import { container } from 'tsyringe'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { useProduct } from '../../src/controller/productController'
import regisContainer from '../../src/di/registration'
import { ApiInterface } from '../../src/interfaces/services/apiInterface'
import { ProductRepository } from '../../src/repositories/productRepository'
import { getProductResponse } from '../helper/product'

describe('product_controller', () => {
  regisContainer()
  const api = mock<ApiInterface>()
  const productRepository = new ProductRepository(api)
  const getProductData = vi.spyOn(productRepository, 'getProductData')
  const resolve = vi.spyOn(container, 'resolve')
  resolve.mockReturnValue(productRepository)

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('get data', async () => {
    getProductData.mockResolvedValue(getProductResponse())
    const productStore = useProduct()
    expect(productStore.isLoading).toBeTruthy()
    expect(productStore.productLength).toBe(0)

    await productStore.getData()

    expect(productStore.isLoading).toBeFalsy()
    expect(productStore.productLength).toBe(1)
  })

  it('get empty data', async () => {
    getProductData.mockResolvedValue(getProductResponse(true))
    const productStore = useProduct()
    expect(productStore.isLoading).toBeTruthy()
    expect(productStore.productLength).toBe(0)

    await productStore.getData()

    expect(productStore.isLoading).toBeFalsy()
    expect(productStore.productLength).toBe(0)
  })
})
