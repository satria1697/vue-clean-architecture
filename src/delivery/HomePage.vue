<script setup lang="ts">
import { onMounted } from 'vue'

import { useProduct } from '../controller/productController'

const productStore = useProduct()

onMounted(async () => {
  await productStore.getData()
})
</script>

<template>
  <div v-if="productStore.isLoading">Loading Data</div>
  <div v-else class="w-full h-full overflow-y-scroll">
    <div v-if="!productStore.productLength">
      <span>Empty Data</span>
    </div>
    <div
      v-else
      v-for="i in productStore.productList"
      :key="i.id"
      class="m-4 p-2.5 rounded-md border flex space-between"
    >
      <div class="flex flex-col w-full">
        <span>{{ i.title }}</span>
        <span>{{ i.description }}</span>
        <span>${{ i.price }}</span>
      </div>
      <div>
        <img :src="i.images[0]" />
      </div>
    </div>
  </div>
</template>
