import type { Meta, StoryObj } from '@storybook/vue3'

import AppButton from '@/components/buttons/AppButton.vue'

export default {
  title: 'Components/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  args: {
    type: 'button',
    size: 'md',
    disabled: false,
    customClass: '',
  },
  argTypes: {
    type: {
      description: 'Defines the button type: `button`, `submit`, or `reset`.',
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    size: {
      description: 'Defines the size of the button.',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      description: 'Disables the button if true.',
      control: { type: 'boolean' },
    },
    customClass: {
      description: 'Custom classes to apply to the button.',
      control: { type: 'text' },
    },
    click: {
      action: 'click',
      description: 'Emitted when the button is clicked.',
    },
  },
  parameters: {
    docs: {
      autodocs: true, // Habilita autodocumentación
    },
  },
} as Meta<typeof AppButton>

type Story = StoryObj<typeof AppButton>

// Historia predeterminada
export const Default: Story = {
  args: {
    default: 'Default Button',
  },
}

// Botón deshabilitado
export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled Button',
  },
}

// Tamaños de botón
export const Small: Story = {
  args: {
    size: 'sm',
    default: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    default: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    default: 'Large Button',
  },
}

// Botón con clase personalizada
export const CustomClass: Story = {
  args: {
    customClass: 'bg-red-500 hover:bg-red-700 text-white',
    default: 'Custom Button',
  },
}

// Botón con slot personalizado
export const WithIcon: Story = {
  render: (args: unknown) => ({
    components: { AppButton },
    setup() {
      return { args }
    },
    template: `
      <AppButton v-bind="args">
        <svg class="w-5 h-5 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Button with Icon
      </AppButton>
    `,
  }),
}

// Botón tipo submit
export const Submit: Story = {
  args: {
    type: 'submit',
    default: 'Submit Button',
  },
}

// Botón tipo reset
export const Reset: Story = {
  args: {
    type: 'reset',
    default: 'Reset Button',
  },
}
