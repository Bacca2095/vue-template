<script lang="ts" setup>
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'

import EyeIcon from '@/assets/svg/eye.svg'
import EyeOffIcon from '@/assets/svg/eye-off.svg'

import AppTypography from '../typography/AppTypography.vue'

const props = defineProps<{
  id?: string
  name: string
  label?: string
  placeholder?: string
  type?: 'text' | 'password' | 'email' | 'number'
  disabled?: boolean
  error?: string
}>()

const isFocused = ref(false)
const showPassword = ref(false)

// Clases base del input
const baseInputClasses =
  'bg-zinc-50 border text-zinc-800 text-sm rounded-xl block w-full p-2.5 focus:outline-none dark:bg-zinc-600 dark:text-zinc-300'

const inputClasses = computed(() => {
  let classes = `${baseInputClasses}`

  if (props.disabled) {
    classes += ' opacity-50 cursor-not-allowed'
  } else if (props.error) {
    // Estilos para error
    classes +=
      ' border-red-500 text-red-600 focus:ring-red-500 focus:border-red-500 dark:border-red-400 dark:text-red-400 dark:focus:ring-red-400 dark:focus:border-red-400'
  } else if (isFocused.value) {
    // Estilos para focus
    classes +=
      ' focus:ring-zinc-800 focus:border-zinc-800 dark:focus:ring-zinc-500 dark:focus:border-zinc-500'
  } else {
    // Estilos predeterminados
    classes += ' border-zinc-300 dark:border-zinc-500 dark:placeholder-zinc-400'
  }

  return classes
})

const labelClasses = computed(() => {
  return `block mb-2 text-sm font-medium ${
    props.error ? 'text-red-500 dark:text-red-400' : 'text-zinc-800 dark:text-zinc-300'
  }`
})

const inputType = computed(() => {
  return props.type === 'password' && showPassword.value ? 'text' : props.type
})

const { value, errorMessage } = useField(() => props.name)
</script>

<template>
  <div class="relative">
    <!-- Etiqueta del input -->
    <label v-if="label" :for="id" :class="labelClasses">
      {{ label }}
    </label>

    <!-- Contenedor del input -->
    <div class="relative">
      <input
        :id="id"
        :type="inputType"
        :placeholder="placeholder || ''"
        :class="inputClasses"
        :disabled="disabled"
        v-model="value"
        @focus="isFocused = true"
        @blur="isFocused = false"
        class="focus:ring-opacity-50 dark:focus:ring-opacity-50 focus:ring-2"
      />

      <button
        v-if="type === 'password'"
        type="button"
        class="right-0 absolute inset-y-0 flex items-center px-3 text-zinc-700 dark:text-zinc-400"
        @click="showPassword = !showPassword"
        title="Show password"
      >
        <EyeOffIcon v-if="showPassword" class="w-5 h-5" />
        <EyeIcon v-else class="w-5 h-5" />
      </button>
    </div>

    <div class="mx-2 mt-2">
      <AppTypography v-if="errorMessage" size="xs" color="red">
        {{ errorMessage }}
      </AppTypography>
    </div>
  </div>
</template>
