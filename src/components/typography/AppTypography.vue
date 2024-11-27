<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span'
  weight?: 'normal' | 'semibold' | 'bold'
  color?: 'default' | 'red' | 'blue' | 'green' | 'gray'
}>()

const textClasses = computed(() => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const weightClasses = {
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const colorClasses = {
    default: 'text-zinc-800 dark:text-zinc-300',
    red: 'text-red-500 dark:text-red-400',
    blue: 'text-blue-500 dark:text-blue-400',
    green: 'text-green-500 dark:text-green-400',
    gray: 'text-zinc-500 dark:text-zinc-400',
  }

  return `
    ${sizeClasses[props.size || 'md']}
    ${alignClasses[props.align || 'left']}
    ${weightClasses[props.weight || 'normal']}
    ${colorClasses[props.color || 'default']}
  `
})

const Element = props.as || 'p'
</script>

<template>
  <component :is="Element" :class="textClasses">
    <slot />
  </component>
</template>
