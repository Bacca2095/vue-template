<script setup lang="ts">
import ChevronRight from '@/assets/svg/chevron-right.svg'
import HomeIcon from '@/assets/svg/home.svg'

type BreadcrumbItem = {
  text: string
  to?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav class="flex mx-8 my-2" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="inline-flex justify-center items-center"
        :aria-current="!item.to ? 'page' : undefined"
      >
        <template v-if="item.to">
          <RouterLink
            :to="item.to"
            class="inline-flex items-center gap-2 font-medium text-sm text-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 dark:text-zinc-400"
          >
            <HomeIcon data-test="home-icon" class="w-4 h-4" v-if="index === 0" />
            {{ item.text }}
          </RouterLink>
        </template>
        <template v-else>
          <div class="flex items-center">
            <HomeIcon class="w-4 h-4" v-if="index === 0" />
            <span class="font-medium text-sm text-zinc-500 ms-1 md:ms-2 dark:text-zinc-300">
              {{ item.text }}
            </span>
          </div>
        </template>

        <template v-if="index !== items.length - 1">
          <ChevronRight class="w-4 h-4 text-zinc-400" />
        </template>
      </li>
    </ol>
  </nav>
</template>
