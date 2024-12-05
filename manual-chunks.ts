const manualChunksConfig = (id: string) => {
  if (id.includes('vueuse')) {
    return 'vueuse'
  }
  if (id.includes('vee-validate') || id.includes('zod')) {
    return 'validation'
  }
  if (id.includes('lodash')) {
    return 'lodash'
  }
  if (id.includes('pinia')) {
    return 'state-management'
  }
  if (id.includes('axios')) {
    return 'axios'
  }
  if (id.includes('devtools')) {
    return 'devtools'
  }
  if (id.includes('vue-router')) {
    return 'router'
  }
  if (id.includes('node_modules')) {
    return 'vendor'
  }
}

export { manualChunksConfig }
