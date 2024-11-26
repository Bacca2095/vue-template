<script setup lang="ts">
import AppCard from '@/components/cards/AppCard.vue'
</script>

<template>
  <KeepAlive>
    <div class="place-items-center grid w-full h-full">
      <AppCard>
        <slot />
      </AppCard>
    </div>
  </KeepAlive>
</template>

<style lang="scss" scoped></style>
