<script setup lang="ts">
interface Props {
  customClass?: string
}

defineProps<Props>()

const baseClasses =
  'block p-6 rounded-3xl shadow-lg hover:bg-opacity-90 transition duration-200 bg-zinc-100  dark:bg-zinc-800'
</script>

<template>
  <div :class="[baseClasses, customClass]">
    <slot name="image" />
    <div>
      <slot name="title" />
      <slot name="content" />
    </div>
  </div>
</template>
