import type { Meta, StoryFn } from '@storybook/vue3'

import AppTypography from '@/components/typography/AppTypography.vue'

export default {
  title: 'Components/AppTypography',
  component: AppTypography,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Define el tamaño del texto',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Define la alineación del texto',
    },
    as: {
      control: 'select',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'span'],
      description: 'Define el tipo de elemento HTML semántico',
    },
    weight: {
      control: 'select',
      options: ['normal', 'semibold', 'bold'],
      description: 'Define el peso del texto',
    },
  },
  tags: ['autodocs'],
} as Meta<typeof AppTypography>

const Template: StoryFn<typeof AppTypography> = (args) => ({
  components: { AppTypography },
  setup() {
    return { args }
  },
  template: `<AppTypography v-bind="args">${args.default}</AppTypography>`,
})

export const Default = Template.bind({})
Default.args = {
  size: 'md',
  align: 'left',
  as: 'p',
  weight: 'normal',
  default: 'This is a default paragraph.',
}

export const BoldHeading = Template.bind({})
BoldHeading.args = {
  size: 'lg',
  align: 'center',
  as: 'h1',
  weight: 'bold',
  default: 'This is a bold centered heading.',
}

export const SemiboldText = Template.bind({})
SemiboldText.args = {
  size: 'sm',
  align: 'right',
  as: 'span',
  weight: 'semibold',
  default: 'This is a semibold small text aligned to the right.',
}

export const DarkMode = Template.bind({})
DarkMode.args = {
  size: 'lg',
  align: 'center',
  as: 'p',
  weight: 'normal',
  default: 'This text adapts to dark mode.',
}
