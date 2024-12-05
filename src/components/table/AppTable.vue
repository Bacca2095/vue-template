<script setup lang="ts">
import { computed, ref } from 'vue'

import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import ArrowUpIcon from '@/assets/svg/arrow-up.svg'
import ArrowUpDownIcon from '@/assets/svg/arrow-up-down.svg'

interface Column {
  key: string
  name: string
  sortable?: boolean
}

interface RowData {
  id: unknown
  [key: string]: unknown
}

interface Props {
  columns: Column[]
  data: RowData[]
  fixed?: boolean
}

const props = defineProps<Props>()

const emits = defineEmits(['sort-change', 'row-click', 'row-dblclick'])

const sortKey = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc' | 'none'>('none')

const handleSort = (column: Column) => {
  if (!column.sortable) return
  if (sortKey.value === column.key) {
    sortDirection.value =
      sortDirection.value === 'asc' ? 'desc' : sortDirection.value === 'desc' ? 'none' : 'asc'
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }
  emits('sort-change', { key: sortKey.value, direction: sortDirection.value })
}

const getSortIcon = (column: Column) => {
  if (sortKey.value !== column.key || sortDirection.value === 'none') {
    return ArrowUpDownIcon
  } else if (sortDirection.value === 'asc') {
    return ArrowUpIcon
  } else {
    return ArrowDownIcon
  }
}

const columnWidthStyle = computed(() => {
  if (props.fixed) {
    const percentage = 100 / props.columns.length
    return { width: `${percentage}%` }
  }
  return {}
})

const selectedRowIds = ref<unknown[]>([])

const handleRowClick = (row: RowData) => {
  const index = selectedRowIds.value.indexOf(row.id)
  if (index !== -1) {
    selectedRowIds.value.splice(index, 1)
  } else {
    selectedRowIds.value.push(row.id)
  }

  emits('row-click', { id: row.id })
}

const handleRowDblClick = (row: RowData) => {
  if (!selectedRowIds.value.includes(row.id)) {
    selectedRowIds.value.push(row.id)
  }
  emits('row-dblclick', { id: row.id })
}
</script>

<template>
  <div class="relative shadow-md rounded-2xl overflow-x-auto">
    <table
      class="rtl:text-right w-full text-left text-sm text-zinc-500 dark:text-zinc-400"
      :class="props.fixed ? 'table-fixed' : ''"
    >
      <thead
        class="bg-zinc-100 dark:bg-zinc-700 text-xs text-zinc-700 dark:text-zinc-400 uppercase"
      >
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            scope="col"
            class="px-6 py-3"
            :style="columnWidthStyle"
          >
            <div class="flex items-center">
              <span
                :class="column.sortable ? 'cursor-pointer select-none' : ''"
                @click="handleSort(column)"
              >
                {{ column.name }}
              </span>
              <template v-if="column.sortable">
                <span class="ml-1.5">
                  <component :is="getSortIcon(column)" class="inline-block w-4 h-4" />
                </span>
              </template>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          :class="[
            ' hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer',
            selectedRowIds.includes(row.id)
              ? 'bg-zinc-200 dark:bg-zinc-600'
              : 'bg-white dark:bg-zinc-800',
          ]"
          @click="handleRowClick(row)"
          @dblclick="handleRowDblClick(row)"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            class="px-6 py-4"
            :style="columnWidthStyle"
            :class="{
              'font-medium text-zinc-900 whitespace-nowrap dark:text-white': colIndex === 0,
              'text-right': colIndex === columns.length - 1,
            }"
          >
            <template v-if="colIndex === columns.length - 1">
              <slot name="actions" :row="row" :index="rowIndex">
                {{ row[column.key] }}
              </slot>
            </template>
            <template v-else>
              {{ row[column.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
