<script setup lang="ts">
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  size?: ButtonSize
  disabled?: boolean
  customClass?: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emits('click', event)
  }
}

const baseClasses =
  'font-medium text-center focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:focus:ring-opacity-50 rounded-full'

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
}

const enabledClasses =
  'text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-zinc-300 ' +
  'dark:bg-zinc-200 dark:hover:bg-zinc-300 dark:focus:ring-zinc-400 ' +
  'dark:text-zinc-900'

const disabledClasses = 'text-white bg-gray-400 cursor-not-allowed'
</script>

<template>
  <button
    :type="type || 'button'"
    :class="[
      baseClasses,
      sizeClasses[size || 'md'],
      disabled ? disabledClasses : enabledClasses,
      customClass,
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
