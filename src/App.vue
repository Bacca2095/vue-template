<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import LoadingComponent from '@/components/AppLoading.vue'

const route = useRoute()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <div class="bg-zinc-50 dark:bg-zinc-900 w-screen h-screen text-zinc-800 dark:text-zinc-300">
        <component :is="route.meta.layout">
          <component :is="Component"></component>
        </component>
      </div>
      <template #fallback>
        <LoadingComponent />
      </template>
    </Suspense>
  </RouterView>
</template>
