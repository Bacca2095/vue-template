<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps<{
  label: string
  name: string
  disabled?: boolean
}>()

const { value } = useField<boolean>(() => props.name)
</script>

<template>
  <div class="flex items-center mb-4">
    <input
      :disabled="disabled"
      type="checkbox"
      v-model="value"
      class="border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-700 w-4 h-4 text-zinc-600"
    />
    <label
      for="default-checkbox"
      class="font-medium text-sm text-zinc-900 dark:text-zinc-300 ms-2"
      >{{ label }}</label
    >
  </div>
</template>
