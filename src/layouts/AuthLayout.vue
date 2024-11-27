<script setup lang="ts">
import AppCard from '@/components/cards/AppCard.vue'
</script>

<template>
  <KeepAlive>
    <div class="place-items-center grid w-full h-full">
      <div class="w-full md:w-1/2 lg:w-1/4">
        <AppCard>
          <slot />
        </AppCard>
      </div>
    </div>
  </KeepAlive>
</template>

<style lang="scss" scoped></style>
