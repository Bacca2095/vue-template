<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, defineEmits, defineProps, ref } from 'vue'

import CheckIcon from '@/assets/svg/check.svg'

interface Props {
  name: string
  label: string
  id?: string
  value?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()

const emits = defineEmits<Emits>()

const generatedId = ref(props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`)

const { value: fieldValue, errorMessage, meta, setTouched } = useField<boolean>(props.name)

const hasError = computed(() => !meta.valid && meta.touched)

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!props.disabled) {
    emits('update:modelValue', target.checked)
    setTouched(true)
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div class="inline-flex items-center">
      <label class="relative flex items-center cursor-pointer">
        <input
          :id="generatedId"
          type="checkbox"
          :value="value"
          :disabled="disabled"
          v-model="fieldValue"
          @change="onChange"
          :class="[
            'peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-full bg-zinc-100 dark:bg-zinc-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 shadow hover:shadow-md border border-zinc-300 dark:border-zinc-600 dark:checked:bg-zinc-200 dark:checked:border-zinc-200 checked:bg-zinc-800 checked:border-zinc-800 focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-600 focus:ring-opacity-50 dark:focus:ring-opacity-50',
            {
              'border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500':
                hasError,
            },
          ]"
        />
        <span
          class="top-1/2 left-1/2 absolute opacity-0 peer-checked:opacity-100 text-zinc-50 dark:text-zinc-900 transform transition-opacity -translate-x-1/2 -translate-y-1/2 duration-200"
        >
          <CheckIcon class="w-3.5 h-3.5" />
        </span>
      </label>
      <label
        :for="generatedId"
        class="ml-2 font-medium text-sm text-zinc-900 dark:text-zinc-300 cursor-pointer select-none"
      >
        <slot>{{ label }}</slot>
      </label>
    </div>
    <span v-if="hasError" class="mt-1 text-red-500 text-sm">
      {{ errorMessage }}
    </span>
  </div>
</template>
