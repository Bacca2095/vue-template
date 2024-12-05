<script setup lang="ts">
import AppCard from '@/components/cards/AppCard.vue'
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="p-2 w-full max-w-sm">
      <AppCard custom-class="m-2">
        <template #content>
          <slot />
        </template>
      </AppCard>
    </div>
  </div>
</template>
