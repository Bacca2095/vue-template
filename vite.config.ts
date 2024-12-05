import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

import { manualChunksConfig } from './manual-chunks'

const cleanFileName = (fileName: string): string =>
  fileName
    .replace(/\.vue_vue_type.*$/, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .toLowerCase()

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: ({ name }) => {
          const cleanedName = cleanFileName(name || 'entry')
          return `assets/${cleanedName}.[hash].js`
        },
        chunkFileNames: ({ name }) => {
          const cleanedName = cleanFileName(name || 'chunk')
          return `assets/${cleanedName}.[hash].js`
        },
        assetFileNames: ({ names }) => {
          const extType = names?.pop()
          const cleanedName = cleanFileName(extType?.split('.')[0] || 'entry')
          return `assets/${cleanedName}.[hash].[ext]`
        },
        manualChunks: manualChunksConfig,
      },
    },
  },
})
