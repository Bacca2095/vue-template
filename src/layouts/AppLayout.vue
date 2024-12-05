<script setup lang="ts">
import AppNavbar from '@/components/navbar/AppNavbar.vue'

const appTitle = 'Mi Aplicación'

const navLinks = [
  { label: 'Inicio', href: '/', active: true },
  { label: 'Acerca de', href: '/about' },
  { label: 'Servicios', href: '/services' },
  { label: 'Precios', href: '/pricing' },
  { label: 'Contacto', href: '/contact' },
]
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <KeepAlive>
      <AppNavbar :title="appTitle" :links="navLinks" />
    </KeepAlive>

    <slot />
  </div>
</template>
