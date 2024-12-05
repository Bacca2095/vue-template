<script setup lang="ts">
import { ref } from 'vue'

import AppPagination from '@/components/pagination/AppPagination.vue'
import AppTable from '@/components/table/AppTable.vue'

const columns = [
  { key: 'productName', name: 'Product Name', sortable: true },
  { key: 'color', name: 'Color', sortable: true },
  { key: 'category', name: 'Category', sortable: false },
  { key: 'price', name: 'Price', sortable: true },
  { key: 'actions', name: 'Actions' },
]

const tableData = [
  {
    id: 1,
    productName: 'Apple MacBook Pro 17"',
    color: 'Silver',
    category: 'Laptop',
    price: '$2999',
  },
  {
    id: 2,
    productName: 'Microsoft Surface Pro',
    color: 'White',
    category: 'Laptop PC',
    price: '$1999',
  },
  {
    id: 3,
    productName: 'Magic Mouse 2',
    color: 'Black',
    category: 'Accessories',
    price: '$99',
  },
]

const currentPage = ref(1)
</script>

<template>
  <div class="m-8">
    <AppTable :columns="columns" :data="tableData" sortable fixed> </AppTable>
    <AppPagination :totalPages="10" v-model="currentPage" />
  </div>
</template>
