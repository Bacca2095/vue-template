<script setup lang="ts">
import { computed } from 'vue'

import ChevronLeftIcon from '@/assets/svg/chevron-left.svg'
import ChevronRightIcon from '@/assets/svg/chevron-right.svg'
import AppTypography from '@/components/typography/AppTypography.vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
})

defineEmits(['pageChange'])

const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1)
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems))
</script>

<template>
  <nav
    class="flex md:flex-row flex-col justify-between items-center gap-4 pt-4"
    aria-label="Table navigation"
  >
    <AppTypography size="sm" align="left">
      Showing
      <AppTypography as="span" size="sm" weight="semibold" class="text-zinc-900 dark:text-zinc-100">
        {{ startItem }}
      </AppTypography>
      -
      <AppTypography as="span" size="sm" weight="semibold" class="text-zinc-900 dark:text-zinc-100">
        {{ endItem }}
      </AppTypography>
      of
      <AppTypography as="span" size="sm" weight="semibold" class="text-zinc-900 dark:text-zinc-100">
        {{ totalItems }}
      </AppTypography>
    </AppTypography>

    <ul class="inline-flex rtl:space-x-reverse h-8 text-sm">
      <li>
        <button
          :disabled="props.currentPage === 1"
          :class="[
            'flex justify-center items-center w-8 h-8 rounded-full transition-all duration-300',
            'bg-white hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-600',
            'text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
            props.currentPage === 1 && 'opacity-50 cursor-not-allowed',
          ]"
          @click="$emit('pageChange', props.currentPage - 1)"
        >
          <ChevronLeftIcon />
        </button>
      </li>

      <li v-for="page in props.totalPages" :key="page">
        <button
          :class="[
            'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300',
            page === props.currentPage
              ? 'bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-500'
              : 'bg-white hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600',
          ]"
          @click="$emit('pageChange', page)"
        >
          <AppTypography as="span" size="sm"> {{ page }} </AppTypography>
        </button>
      </li>

      <li>
        <button
          :disabled="props.currentPage === props.totalPages"
          :class="[
            'flex justify-center items-center w-8 h-8 rounded-full transition-all duration-300',
            'bg-white hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-600',
            'text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
            props.currentPage === props.totalPages && 'opacity-50 cursor-not-allowed',
          ]"
          @click="$emit('pageChange', props.currentPage + 1)"
        >
          <ChevronRightIcon />
        </button>
      </li>
    </ul>
  </nav>
</template>
