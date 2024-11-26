import type { Meta, StoryFn } from '@storybook/vue3'

import AppInput from '@/components/inputs/AppInput.vue'

export default {
  title: 'Components/AppInput',
  component: AppInput,
  argTypes: {
    label: {
      control: 'text',
      description: 'Etiqueta para el campo de entrada',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de marcador dentro del campo',
    },
    name: {
      control: 'text',
      description: 'Nombre en el campo de entrada',
    },

    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'Tipo de entrada',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilitar el campo',
    },
    error: {
      control: 'text',
      description: 'Mensaje de error para el campo',
    },
  },
  tags: ['autodocs'],
} as Meta<typeof AppInput>

const Template: StoryFn<typeof AppInput> = (args) => ({
  components: { AppInput },
  setup() {
    return { args }
  },
  template: `<AppInput v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Default Input',
  placeholder: 'Enter your text',
  type: 'text',

  disabled: false,
  error: '',
}

export const Password = Template.bind({})
Password.args = {
  label: 'Password Input',
  placeholder: 'Enter your password',
  type: 'password',

  disabled: false,
  error: '',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'Cannot enter text',
  type: 'text',

  disabled: true,
  error: '',
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Error Input',
  placeholder: 'Enter your text',
  type: 'text',

  disabled: false,
  error: 'This field is required',
}
