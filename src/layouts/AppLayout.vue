<script setup lang="ts">
import AppNavbar from '@/components/navbar/AppNavbar.vue'
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <KeepAlive>
      <AppNavbar
        :links="[
          { text: 'Home', to: '/' },
          {
            text: 'About',
            to: '/about',
          },
        ]"
      />
    </KeepAlive>
    <slot />
  </div>
</template>
