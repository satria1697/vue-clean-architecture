import 'reflect-metadata'
import { createPinia, setActivePinia } from 'pinia'
import { container } from 'tsyringe'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { useProduct } from '../../src/controller/productController'
import { ProductRepositoryInterface } from '../../src/interfaces/repositories/productRepositoryInterface'
import { getProductResponse } from '../helper/product'

describe('product_controller', () => {
  const productRepository = mock<ProductRepositoryInterface>()
  const resolve = vi.spyOn(container, 'resolve')

  beforeEach(() => {
    setActivePinia(createPinia())
    resolve.mockReturnValueOnce(productRepository)
  })

  it('get data', async () => {
    productRepository.getProductData.mockResolvedValue(getProductResponse())
    const productStore = useProduct()
    expect(productStore.isLoading).toBeTruthy()
    expect(productStore.productLength).toBe(0)

    await productStore.getData()

    expect(productStore.isLoading).toBeFalsy()
    expect(productStore.productLength).toBe(1)
  })

  it('get empty data', async () => {
    productRepository.getProductData.mockResolvedValue(getProductResponse(true))
    const productStore = useProduct()
    expect(productStore.isLoading).toBeTruthy()
    expect(productStore.productLength).toBe(0)

    await productStore.getData()

    expect(productStore.isLoading).toBeFalsy()
    expect(productStore.productLength).toBe(0)
  })
})
