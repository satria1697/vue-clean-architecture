import { defineStore } from 'pinia'
import { container } from 'tsyringe'
import { computed, reactive } from 'vue'

import { Product } from '../entities/product'
import { ProductRepository } from '../repositories/productRepository'

interface productState {
  products: Array<Product>
  isLoading: boolean
}

export const useProduct = defineStore('products', () => {
  const state = reactive<productState>({
    isLoading: true,
    products: []
  })
  const productRepository = container.resolve(ProductRepository)
  const productLength = computed(() => state.products.length)
  const productList = computed(() => state.products)
  const isLoading = computed(() => state.isLoading)

  const getData = async () => {
    state.isLoading = true
    const data = await productRepository.getProductData()
    state.products = data.products
    state.isLoading = false
  }

  return {
    getData,
    productLength,
    productList,
    isLoading
  }
})
