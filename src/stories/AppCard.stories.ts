import type { Meta, StoryObj } from '@storybook/vue3'

import AppCard from '@/components/cards/AppCard.vue'

export default {
  title: 'Components/AppCard',
  component: AppCard,
  tags: ['autodocs'], // Activa autodocumentación
  args: {
    customClass: '',
  },
  argTypes: {
    customClass: {
      description: 'Custom classes to apply to the card.',
      control: { type: 'text' },
    },
  },
  parameters: {
    docs: {
      autodocs: true, // Habilita autodocumentación
    },
  },
} as Meta<typeof AppCard>

type Story = StoryObj<typeof AppCard>

// Historia predeterminada
export const Default: Story = {
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <template #title>
          <h3 class="text-lg font-bold">Default Card Title</h3>
        </template>
        <template #content>
          <p class="text-sm text-zinc-600 dark:text-zinc-300">
            This is a default card with basic content.
          </p>
        </template>
      </AppCard>
    `,
  }),
}

// Tarjeta con imagen
export const WithImage: Story = {
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <template #image>
          <img src="https://via.placeholder.com/300x150" alt="Placeholder Image" class="rounded-t-3xl w-full" />
        </template>
        <template #title>
          <h3 class="text-lg font-bold">Card with Image</h3>
        </template>
        <template #content>
          <p class="text-sm text-zinc-600 dark:text-zinc-300">
            This card includes an image slot at the top.
          </p>
        </template>
      </AppCard>
    `,
  }),
}

// Tarjeta con clases personalizadas
export const CustomClass: Story = {
  args: {
    customClass: 'bg-blue-100 dark:bg-blue-800 hover:bg-blue-200',
  },
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <template #title>
          <h3 class="text-lg font-bold">Custom Styled Card</h3>
        </template>
        <template #content>
          <p class="text-sm text-zinc-600 dark:text-zinc-300">
            This card demonstrates the use of customClass for custom styling.
          </p>
        </template>
      </AppCard>
    `,
  }),
}

// Tarjeta con solo título
export const TitleOnly: Story = {
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <template #title>
          <h3 class="text-lg font-bold">Title Only Card</h3>
        </template>
      </AppCard>
    `,
  }),
}

// Tarjeta con solo contenido
export const ContentOnly: Story = {
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <template #content>
          <p class="text-sm text-zinc-600 dark:text-zinc-300">
            This card contains only content without a title or image.
          </p>
        </template>
      </AppCard>
    `,
  }),
}

// Tarjeta vacía
export const Empty: Story = {
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args" />
    `,
  }),
}
