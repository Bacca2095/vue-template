import type { Meta, StoryObj } from '@storybook/vue3'

import AppBreadcrumb from '@/components/breadcrumb/AppBreadcrumb.vue'

export default {
  title: 'Components/AppBreadcrumb',
  component: AppBreadcrumb,
  tags: ['autodocs'], // Activa autodocumentación
  args: {
    items: [
      { text: 'Home', to: '/' },
      { text: 'Category', to: '/category' },
      { text: 'Subcategory', to: '/subcategory' },
      { text: 'Current Page' },
    ],
  },
  argTypes: {
    items: {
      description:
        'Defines the breadcrumb items. Each item can have `text` and an optional `to` prop for navigation.',
      control: { type: 'object' },
    },
  },
  parameters: {
    docs: {
      autodocs: true, // Habilita autodocumentación
    },
  },
} as Meta<typeof AppBreadcrumb>

type Story = StoryObj<typeof AppBreadcrumb>

// Historia predeterminada
export const Default: Story = {}

// Breadcrumb con solo un elemento
export const SingleItem: Story = {
  args: {
    items: [{ text: 'Home', to: '/' }],
  },
}

// Breadcrumb con rutas dinámicas
export const DynamicRoutes: Story = {
  args: {
    items: [
      { text: 'Dashboard', to: '/dashboard' },
      { text: 'Reports', to: '/dashboard/reports' },
      { text: '2024 Report', to: '/dashboard/reports/2024' },
    ],
  },
}

// Breadcrumb con elemento final sin enlace
export const LastItemNoLink: Story = {
  args: {
    items: [
      { text: 'Home', to: '/' },
      { text: 'Projects', to: '/projects' },
      { text: 'Project A' }, // Último elemento sin enlace
    ],
  },
}

// Breadcrumb con muchos niveles
export const ManyLevels: Story = {
  args: {
    items: [
      { text: 'Home', to: '/' },
      { text: 'Level 1', to: '/level-1' },
      { text: 'Level 2', to: '/level-2' },
      { text: 'Level 3', to: '/level-3' },
      { text: 'Level 4', to: '/level-4' },
      { text: 'Current Page' },
    ],
  },
}

// Breadcrumb con icono personalizado en el primer elemento
export const CustomFirstIcon: Story = {
  render: (args) => ({
    components: { AppBreadcrumb },
    setup() {
      return { args }
    },
    template: `
      <AppBreadcrumb v-bind="args">
        <template #icon="{ index }">
          <svg v-if="index === 0" class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5a1 1 0 012 0v4a1 1 0 01-2 0zm0 2a1 1 0 012 0v4a1 1 0 01-2 0v-4z"/>
          </svg>
        </template>
      </AppBreadcrumb>
    `,
  }),
}

// Breadcrumb completamente deshabilitado
export const DisabledLinks: Story = {
  render: (args) => ({
    components: { AppBreadcrumb },
    setup() {
      return { args }
    },
    template: `
      <AppBreadcrumb v-bind="args">
        <template #link="{ item }">
          <span class="text-gray-500 cursor-not-allowed">{{ item.text }}</span>
        </template>
      </AppBreadcrumb>
    `,
  }),
  args: {
    items: [
      { text: 'Home', to: '/' },
      { text: 'Settings', to: '/settings' },
      { text: 'User Management' },
    ],
  },
}
