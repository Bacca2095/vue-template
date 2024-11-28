<script lang="ts" setup>
import { computed } from 'vue'

defineEmits(['click'])

const props = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()

const baseClasses = 'font-medium rounded-full focus:outline-none focus:ring-2'

const themeClasses = computed(() => {
  return `
    text-white bg-zinc-800 hover:bg-zinc-700 focus:ring-zinc-500
    dark:text-zinc-800 dark:bg-zinc-200 dark:hover:bg-zinc-300 dark:focus:ring-zinc-400
  `
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-lg px-6 py-3',
  }
  return sizes[props.size || 'md']
})

const buttonClasses = computed(() => {
  return `${baseClasses} ${themeClasses.value} ${sizeClasses.value} ${
    props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`
})
</script>

<template>
  <button :class="buttonClasses" :type="type" :disabled="disabled" @click="$emit('click')">
    <span class="font-bold text-white dark:text-zinc-800"><slot /></span>
  </button>
</template>
