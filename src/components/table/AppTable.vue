<script setup lang="ts" generic="T extends Record<string, unknown>">
import { ref } from 'vue'

import AppTypography from '@/components/typography/AppTypography.vue'

const props = defineProps<{
  headers: { text: string; key: keyof T }[]
  data: T[]
  primaryKey: keyof T
  hoverable?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'rowClick', row: T | null): void
  (e: 'rowDblClick', row: T): void
}>()

const selectedPrimaryKey = ref<T[keyof T] | null>(null)

const onRowClick = (row: T) => {
  if (selectedPrimaryKey.value === row[props.primaryKey]) {
    selectedPrimaryKey.value = null
    emit('rowClick', null)
  } else {
    selectedPrimaryKey.value = row[props.primaryKey]
    emit('rowClick', row)
  }
}

const onRowDblClick = (row: T) => {
  emit('rowDblClick', row)
}

const isRowSelected = (row: T) => selectedPrimaryKey.value === row[props.primaryKey]

const getPrimaryKey = (row: T) => row[props.primaryKey] as string
</script>

<template>
  <div class="relative shadow-md rounded-xl overflow-x-auto">
    <table class="rtl:text-right w-full text-left text-sm">
      <thead class="bg-zinc-200 dark:bg-zinc-600">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="px-6 py-3 font-semibold text-zinc-700 dark:text-zinc-300"
          >
            <AppTypography size="md" weight="semibold">{{ header.text }}</AppTypography>
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-if="props.loading">
          <tr>
            <td colspan="100%" class="bg-zinc-100 dark:bg-zinc-700 px-6 py-4 text-center">
              <AppTypography size="md" align="center" class="text-zinc-800 dark:text-zinc-300">
                Loading...
              </AppTypography>
            </td>
          </tr>
        </template>

        <template v-else-if="data.length === 0">
          <tr>
            <td colspan="100%" class="bg-zinc-100 dark:bg-zinc-700 px-6 py-4 text-center">
              <AppTypography size="md" align="center" class="text-zinc-800 dark:text-zinc-300">
                No data available
              </AppTypography>
            </td>
          </tr>
        </template>

        <template v-else>
          <tr
            v-for="row in data"
            :key="getPrimaryKey(row)"
            :class="[
              'bg-zinc-100 dark:bg-zinc-700',
              hoverable && 'hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer',
              isRowSelected(row) && 'bg-zinc-300 dark:bg-zinc-500',
            ]"
            @click="onRowClick(row)"
            @dblclick="onRowDblClick(row)"
            v-memo="[row, selectedPrimaryKey]"
          >
            <td
              v-for="header in headers"
              :key="header.key"
              class="px-6 py-4 text-zinc-800 dark:text-zinc-300"
            >
              <slot :name="`cell-${String(header.key)}`" :row="row" :value="row[header.key]">
                <AppTypography size="sm">{{ row[header.key] }}</AppTypography>
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
