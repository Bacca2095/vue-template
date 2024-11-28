import { fileURLToPath } from 'node:url'

import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html', 'lcov'],
        include: ['src/**/*'],
        exclude: [
          'src/main.ts',
          'src/App.vue',
          'src/router/*',
          'src/stores/*',
          'src/layouts/*',
          'src/stories/*',
          'src/types/*',
          'src/views/*',
          'src/**/*.test.ts',
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  }),
)
