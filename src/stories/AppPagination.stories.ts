import type { Meta, StoryObj } from '@storybook/vue3'

import Paginator from '@/components/pagination/AppPagination.vue'

export default {
  title: 'Components/AppPaginator',
  component: Paginator,
  tags: ['autodocs'], // Activa autodocumentación
  args: {
    totalPages: 10,
    modelValue: 1,
    maxVisiblePages: 5,
  },
  argTypes: {
    totalPages: {
      description: 'Total number of pages available.',
      control: { type: 'number' },
    },
    modelValue: {
      description: 'Current page (v-model).',
      control: { type: 'number' },
    },
    maxVisiblePages: {
      description: 'Maximum number of visible pages in the paginator.',
      control: { type: 'number' },
    },
    'update:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the current page changes.',
    },
  },
  parameters: {
    docs: {
      autodocs: true, // Habilita autodocumentación
    },
  },
} as Meta<typeof Paginator>

type Story = StoryObj<typeof Paginator>

// Historia predeterminada
export const Default: Story = {}

// Paginador con solo 3 páginas visibles
export const FewPages: Story = {
  args: {
    totalPages: 3,
    modelValue: 1,
    maxVisiblePages: 3,
  },
}

// Paginador con muchas páginas visibles
export const ManyPagesVisible: Story = {
  args: {
    totalPages: 20,
    modelValue: 10,
    maxVisiblePages: 7,
  },
}

// Paginador deshabilitado (primer y último botón no clickeables)
export const DisabledNavigation: Story = {
  args: {
    totalPages: 1,
    modelValue: 1,
    maxVisiblePages: 1,
  },
}

// Paginador con inicio en una página avanzada
export const AdvancedStart: Story = {
  args: {
    totalPages: 10,
    modelValue: 5,
    maxVisiblePages: 5,
  },
}

// Paginador con estado personalizado (clases adicionales)
export const CustomStyles: Story = {
  render: (args) => ({
    components: { Paginator },
    setup() {
      return { args }
    },
    template: `
      <Paginator v-bind="args" class="bg-blue-50 border border-blue-200 rounded-lg p-4" />
    `,
  }),
  args: {
    totalPages: 10,
    modelValue: 1,
    maxVisiblePages: 5,
  },
}
