<script setup lang="ts">
import AppCheckbox from '@/components/inputs/AppCheckbox.vue'
import Pagination from '@/components/pagination/AppPagination.vue'
import AppTable from '@/components/table/AppTable.vue'

const headers: { text: string; key: 'color' | 'name' | 'category' | 'price' }[] = [
  { text: 'Product Name', key: 'name' },
  { text: 'Color', key: 'color' },
  { text: 'Category', key: 'category' },
  { text: 'Price', key: 'price' },
]

const data = [
  { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
  { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
  { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
]

const totalItems = data.length
const itemsPerPage = 10
const currentPage = 1
</script>

<template>
  <div class="m-8">
    <AppCheckbox name="verdadero" label="Hola mundo" />
    <AppTable :headers="headers" :data="data" primaryKey="name" />
    <Pagination
      :currentPage="currentPage"
      :totalPages="Math.ceil(totalItems / itemsPerPage)"
      :totalItems="totalItems"
      :itemsPerPage="itemsPerPage"
    />
  </div>
</template>
