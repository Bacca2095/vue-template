import type { Meta, StoryObj } from '@storybook/vue3'

import AppCheckbox from '@/components/inputs/AppCheckbox.vue'

export default {
  title: 'Components/AppCheckbox',
  component: AppCheckbox,
  tags: ['autodocs'],
  args: {
    name: 'example-checkbox',
    label: 'Accept terms and conditions',
    id: 'checkbox-1',
    value: undefined,
    disabled: false,
  },
  argTypes: {
    name: {
      description: 'Name attribute for the checkbox. Used by `vee-validate`.',
      control: { type: 'text' },
    },
    label: {
      description: 'Label displayed next to the checkbox.',
      control: { type: 'text' },
    },
    id: {
      description: 'Optional ID for the checkbox. Defaults to a generated ID.',
      control: { type: 'text' },
    },
    value: {
      description: 'Value of the checkbox when checked.',
      control: { type: 'text' },
    },
    disabled: {
      description: 'If true, disables the checkbox.',
      control: { type: 'boolean' },
    },
    'update:modelValue': {
      action: 'update:modelValue',
      description: 'Emitted when the checkbox value changes.',
    },
  },
  parameters: {
    docs: {
      autodocs: true, // Habilita autodocumentación
    },
  },
} as Meta<typeof AppCheckbox>

type Story = StoryObj<typeof AppCheckbox>

// Historia predeterminada
export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
}

// Checkbox deshabilitado
export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
}

// Checkbox con error
export const WithError: Story = {
  render: (args) => ({
    components: { AppCheckbox },
    setup() {
      return { args }
    },
    template: `
      <AppCheckbox v-bind="args" />
    `,
    data() {
      return {
        meta: { valid: false, touched: true },
        errorMessage: 'This field is required.',
      }
    },
  }),
  args: {
    label: 'Checkbox with Error',
  },
}

// Checkbox preseleccionado
export const Checked: Story = {
  args: {
    label: 'Pre-checked Checkbox',
    value: 'checked',
  },
}

// Checkbox con contenido personalizado
export const CustomContent: Story = {
  render: (args) => ({
    components: { AppCheckbox },
    setup() {
      return { args }
    },
    template: `
      <AppCheckbox v-bind="args">
        <template #default>
          <span class="font-bold text-blue-500">I agree to the <a href="#" class="underline">privacy policy</a>.</span>
        </template>
      </AppCheckbox>
    `,
  }),
}
