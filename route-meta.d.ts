import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    layout: Component
    title: string
  }
}
