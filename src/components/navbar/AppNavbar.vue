<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import MenuIcon from '@/assets/svg/menu.svg'
import VueIcon from '@/assets/svg/vue.svg'

defineProps<{
  links: { text: string; to: string }[]
}>()

const isMenuOpen = ref(false)
</script>

<template>
  <nav class="border-zinc-200 bg-zinc-50 dark:bg-zinc-800">
    <div class="flex flex-wrap justify-between items-center p-4">
      <div class="flex items-center gap-4">
        <slot name="icon">
          <VueIcon class="w-10 h-10" />
        </slot>

        <slot name="title">
          <span class="font-semibold text-2xl text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
            Default Title
          </span>
        </slot>
      </div>

      <button
        @click="isMenuOpen = !isMenuOpen"
        type="button"
        class="inline-flex justify-center items-center md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 rounded-lg focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-600 w-10 h-10 text-sm text-zinc-500 focus:outline-none dark:text-zinc-400"
        aria-controls="navbar-default"
        :aria-expanded="isMenuOpen"
      >
        <span class="sr-only">Menu</span>
        <MenuIcon class="w-6 h-6" />
      </button>

      <div
        :class="{
          hidden: !isMenuOpen,
          'block w-full md:flex md:w-auto': isMenuOpen,
        }"
        class="md:block md:w-auto"
        id="navbar-default"
      >
        <ul
          class="flex md:flex-row flex-col md:space-x-3 rtl:space-x-reverse border-zinc-100 md:border-0 dark:border-zinc-700 bg-zinc-50 md:bg-zinc-50 md:dark:bg-zinc-800 dark:bg-zinc-800 mt-4 md:mt-0 p-3 md:p-0 border rounded-lg font-medium"
        >
          <li v-for="(link, index) in links" :key="index">
            <RouterLink
              :to="link.to"
              class="block px-2.5 py-1.5 font-medium text-center text-sm text-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-900 dark:text-zinc-400 transition-all duration-300"
              active-class="rounded-full bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50 
                dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:hover:text-zinc-800"
            >
              {{ link.text }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
