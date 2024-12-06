<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'

import EyeIcon from '@/assets/svg/eye.svg'
import EyeOffIcon from '@/assets/svg/eye-off.svg'
import { createUUID } from '@/utils/create-uuid'

type InputSize = 'sm' | 'md' | 'lg'

interface Props {
  name: string
  id?: string
  label?: string
  placeholder?: string
  size?: InputSize
  disabled?: boolean
  customClass?: string
  type?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const generatedId = ref(props.id || `input-${createUUID()}`)

const { value: field, errorMessage, meta, setTouched } = useField(props.name)

const hasError = computed(() => !meta.valid && meta.touched)

const onBlur = () => {
  setTouched(true)
}

const baseClasses =
  'block w-full text-zinc-900 rounded-2xl focus:outline-none focus:ring-2 transition-colors focus:ring-opacity-50 dark:focus:ring-opacity-50'
const sizeClasses: Record<InputSize, string> = {
  sm: 'p-2 text-xs',
  md: 'p-2.5 text-sm',
  lg: 'p-4 text-base',
}
const enabledClasses =
  'bg-zinc-50 border border-zinc-300 focus:ring-zinc-300 focus:border-zinc-500 ' +
  'dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white ' +
  'dark:focus:ring-zinc-400 dark:focus:border-zinc-500'
const disabledClasses =
  'bg-zinc-200 border border-zinc-300 text-zinc-500 cursor-not-allowed ' +
  'dark:bg-zinc-600 dark:border-zinc-500 dark:text-zinc-400'
const labelClasses = 'block mb-2 text-sm font-medium text-zinc-900 dark:text-white'

const isPasswordVisible = ref(false)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const type = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type || 'text'
})
</script>

<template>
  <div class="mb-6">
    <label v-if="label" :for="generatedId" :class="labelClasses">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="generatedId"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="field"
        @blur="onBlur"
        :class="[
          baseClasses,
          sizeClasses[size || 'md'],
          disabled ? disabledClasses : enabledClasses,
          customClass,
          {
            'border-red-500 text-red-500 focus:ring-red-500 dark:border-red-500 dark:text-red-500 dark:focus:ring-red-500':
              hasError,
          },
        ]"
        :aria-invalid="hasError"
        :aria-describedby="hasError ? `${generatedId}-error` : undefined"
      />

      <button
        v-if="props.type === 'password'"
        type="button"
        class="right-0 absolute inset-y-0 flex items-center pr-3 text-sm text-zinc-300 dark:text-zinc-500 leading-5 focus:outline-none"
        @click="togglePasswordVisibility"
        :aria-label="isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        :aria-pressed="isPasswordVisible"
      >
        <EyeOffIcon v-if="isPasswordVisible" class="w-5 h-5" />
        <EyeIcon v-else class="w-5 h-5" />
      </button>
    </div>

    <span v-if="hasError" :id="`${generatedId}-error`" class="mt-1 text-red-500 text-sm">
      {{ errorMessage }}
    </span>
  </div>
</template>
