<script setup lang="ts">
import { ref } from 'vue'

import CloseIcon from '@/assets/svg/close.svg'
import MenuIcon from '@/assets/svg/menu.svg'

interface Link {
  label: string
  href: string
  active?: boolean
}

interface Props {
  title: string
  links: Link[]
}

defineProps<Props>()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <nav class="bg-zinc-50 dark:bg-zinc-900 w-full">
    <div class="flex justify-between items-center mx-auto px-4 py-2">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <slot name="logo">
          <span class="font-semibold text-2xl text-zinc-900 dark:text-white">{{ title }}</span>
        </slot>
      </div>

      <button
        @click="toggleMenu"
        class="inline-flex justify-center items-center md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 rounded-full focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-600 w-10 h-10 text-zinc-500 focus:outline-none dark:text-zinc-400"
        aria-controls="navbar-menu"
        :aria-expanded="isMenuOpen"
      >
        <span class="sr-only">Abrir menú principal</span>
        <component :is="isMenuOpen ? CloseIcon : MenuIcon" class="w-5 h-5" />
      </button>

      <div class="md:flex md:items-center hidden md:w-auto" id="navbar-menu-desktop">
        <ul class="flex flex-row space-x-6 rtl:space-x-reverse md:font-medium md:text-sm">
          <li v-for="(link, index) in links" :key="index">
            <a
              :href="link.href"
              class="block hover:bg-zinc-100 dark:hover:bg-zinc-700 px-3 py-2 rounded-full text-zinc-700 hover:text-zinc-900 dark:hover:text-white dark:text-zinc-300"
              :class="{
                'bg-zinc-200 dark:bg-zinc-800 dark:text-white': link.active,
              }"
              :aria-current="link.active ? 'page' : undefined"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <transition name="fade">
      <div v-if="isMenuOpen" class="z-50 fixed inset-0 bg-zinc-50 dark:bg-zinc-900 overflow-y-auto">
        <div class="flex justify-between items-center px-4 py-2">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <slot name="logo">
              <span class="font-semibold text-2xl text-zinc-900 dark:text-white">{{ title }}</span>
            </slot>
          </div>
          <button
            @click="toggleMenu"
            class="inline-flex justify-center items-center hover:bg-zinc-100 dark:hover:bg-zinc-700 p-2 rounded-full focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-600 w-10 h-10 text-zinc-500 focus:outline-none dark:text-zinc-400"
          >
            <span class="sr-only">Cerrar menú</span>
            <CloseIcon class="w-5 h-5" />
          </button>
        </div>
        <ul class="flex flex-col space-y-2 px-4 py-2">
          <li v-for="(link, index) in links" :key="index">
            <a
              @click="toggleMenu"
              :href="link.href"
              class="block hover:bg-zinc-100 dark:hover:bg-zinc-700 px-3 py-2 rounded-full text-lg text-zinc-700 hover:text-zinc-900 dark:hover:text-white dark:text-zinc-300"
              :class="{
                'bg-zinc-200 dark:bg-zinc-800 dark:text-white': link.active,
              }"
              :aria-current="link.active ? 'page' : undefined"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
