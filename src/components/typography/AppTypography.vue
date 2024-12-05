<!-- src/components/AppTypography.vue -->
<template>
  <component :is="Element" :class="textClasses" :style="customStyle">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
type TextAlign = 'left' | 'center' | 'right' | 'justify'
type TextElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'div'
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
type TextColor = 'default' | 'red' | 'blue' | 'green' | 'gray' | 'custom'

interface Props {
  size?: TextSize
  align?: TextAlign
  as?: TextElement
  weight?: TextWeight
  color?: TextColor
  invert?: boolean
  customColor?: string
  customClass?: string
}

const props = defineProps<Props>()

const textClasses = computed(() => {
  const sizeClass = props.size ? `text-${props.size}` : 'text-base'

  const alignClass = props.align ? `text-${props.align}` : ''

  const weightClasses: Record<TextWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  }
  const weightClass = weightClasses[props.weight || 'normal']

  const colorClasses: Record<TextColor, string> = {
    default: props.invert ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-700 dark:text-zinc-300',
    red: props.invert ? 'text-red-700 dark:text-red-300' : 'text-red-500 dark:text-red-400',
    blue: props.invert ? 'text-blue-700 dark:text-blue-300' : 'text-blue-500 dark:text-blue-400',
    green: props.invert
      ? 'text-green-700 dark:text-green-300'
      : 'text-green-500 dark:text-green-400',
    gray: props.invert ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400',
    custom: '', // No clase para custom, manejaremos el color vía estilos
  }
  const colorClass = colorClasses[props.color || 'default']

  return [sizeClass, alignClass, weightClass, colorClass, props.customClass || '']
    .filter(Boolean)
    .join(' ')
    .trim()
})

// Computed style para el color personalizado
const customStyle = computed(() => {
  if (props.color === 'custom' && props.customColor) {
    return { color: props.customColor }
  }
  return {}
})

const Element = props.as || 'p'
</script>
