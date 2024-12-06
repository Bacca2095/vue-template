import type { Meta, StoryObj } from '@storybook/vue3'

import AppInput from '@/components/inputs/AppInput.vue'

export default {
  title: 'Components/AppInput',
  component: AppInput,
  tags: ['autodocs'],
  args: {
    name: 'example-input',
    id: 'input-1',
    label: 'Default Input',
    placeholder: 'Type something...',
    size: 'md',
    disabled: false,
    type: 'text',
    customClass: '',
  },
  argTypes: {
    name: {
      description: 'Name attribute for the input. Used by `vee-validate`.',
      control: { type: 'text' },
    },
    id: {
      description: 'Optional ID for the input. Defaults to a generated ID.',
      control: { type: 'text' },
    },
    label: {
      description: 'Label displayed above the input.',
      control: { type: 'text' },
    },
    placeholder: {
      description: 'Placeholder text for the input.',
      control: { type: 'text' },
    },
    size: {
      description: 'Defines the size of the input.',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      description: 'If true, disables the input.',
      control: { type: 'boolean' },
    },
    type: {
      description: 'Defines the input type, e.g., `text`, `password`.',
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
    customClass: {
      description: 'Custom classes to apply to the input.',
      control: { type: 'text' },
    },
    'update:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the input value changes.',
    },
  },
  parameters: {
    docs: {
      autodocs: true, // Habilita autodocumentación
    },
  },
} as Meta<typeof AppInput>

type Story = StoryObj<typeof AppInput>

// Historia predeterminada
export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
}

// Input deshabilitado
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot type here...',
    disabled: true,
  },
}

// Tamaños de input
export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size...',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size...',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size...',
    size: 'lg',
  },
}

// Input con error
export const WithError: Story = {
  render: (args) => ({
    components: { AppInput },
    setup() {
      return { args }
    },
    template: `
      <AppInput v-bind="args" />
    `,
    data() {
      return {
        meta: { valid: false, touched: true },
        errorMessage: 'This field is required.',
      }
    },
  }),
  args: {
    label: 'Input with Error',
    placeholder: 'Field with error...',
  },
}

// Input tipo contraseña
export const Password: Story = {
  args: {
    label: 'Password Input',
    placeholder: 'Enter your password...',
    type: 'password',
  },
}

// Input con clase personalizada
export const CustomClass: Story = {
  args: {
    label: 'Custom Styled Input',
    placeholder: 'Custom styles applied...',
    customClass: 'border-blue-500 focus:ring-blue-300',
  },
}
