<!-- src/components/Paginator.vue -->
<script setup lang="ts">
import { computed } from 'vue'

import ChevronLeftIcon from '@/assets/svg/chevron-left.svg'
import ChevronRightIcon from '@/assets/svg/chevron-right.svg'

interface Props {
  totalPages: number
  modelValue: number
  maxVisiblePages?: number // Número máximo de páginas visibles (opcional)
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const currentPage = computed({
  get: () => props.modelValue,
  set: (value: number) => {
    emits('update:modelValue', value)
  },
})

const maxVisiblePages = props.maxVisiblePages ?? 3

const pages = computed(() => {
  const totalPages = props.totalPages
  const current = currentPage.value
  const half = Math.floor(maxVisiblePages / 2)
  let start = current - half
  let end = current + half

  if (start <= 1) {
    start = 1
    end = Math.min(totalPages, maxVisiblePages)
  } else if (end >= totalPages) {
    start = Math.max(1, totalPages - maxVisiblePages + 1)
    end = totalPages
  }

  const pagesArray = []

  if (start > 1) {
    pagesArray.push(1)
    if (start > 2) {
      pagesArray.push('ellipsis-prev')
    }
  }

  for (let i = start; i <= end; i++) {
    pagesArray.push(i)
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pagesArray.push('ellipsis-next')
    }
    pagesArray.push(totalPages)
  }

  return pagesArray
})

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    currentPage.value = page
  }
}
</script>

<template>
  <nav class="flex justify-center md:justify-end my-2" aria-label="Paginación">
    <ul class="flex items-center space-x-1 h-8 text-sm">
      <li>
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'flex justify-center items-center w-8 h-8 leading-tight text-zinc-500 bg-transparent hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200',
            currentPage > 1 ? 'hover:rounded-full' : '',
          ]"
          aria-label="Página anterior"
        >
          <ChevronLeftIcon class="w-3 h-3 rtl:rotate-180" />
        </button>
      </li>

      <li v-for="(page, index) in pages" :key="index">
        <button
          v-if="typeof page === 'number'"
          @click="changePage(page)"
          :class="[
            'flex items-center justify-center w-8 h-8 leading-tight transition-all duration-200',
            currentPage === page
              ? 'text-white bg-zinc-800 rounded-full dark:bg-zinc-200 dark:text-zinc-800'
              : 'text-zinc-500 bg-transparent hover:bg-zinc-100 hover:text-zinc-700 hover:rounded-full dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white',
          ]"
          :aria-current="currentPage === page ? 'page' : false"
        >
          {{ page }}
        </button>

        <span
          v-else
          class="flex justify-center items-center w-8 h-8 text-zinc-500 dark:text-zinc-400"
        >
          &hellip;
        </span>
      </li>

      <li>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === props.totalPages"
          :class="[
            'flex justify-center items-center w-8 h-8 leading-tight text-zinc-500 bg-transparent hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200',
            currentPage < props.totalPages ? 'hover:rounded-full' : '',
          ]"
          aria-label="Página siguiente"
        >
          <ChevronRightIcon class="w-3 h-3 rtl:rotate-180" />
        </button>
      </li>
    </ul>
  </nav>
</template>
