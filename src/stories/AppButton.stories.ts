import type { Meta, StoryFn } from '@storybook/vue3'

import AppButton from '@/components/buttons/AppButton.vue'

export default {
  title: 'Components/AppButton',
  component: AppButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: 'boolean',
    },
    default: {
      control: 'text',
    },
    click: { action: 'click' },
  },
  tags: ['autodocs'],
} as Meta<typeof AppButton>

const Template: StoryFn<typeof AppButton> = (args, {}) => ({
  components: { AppButton },
  setup() {
    return { args }
  },
  template: `<AppButton v-bind="args">{{ args.default }}</AppButton>`,
})

export const Default = Template.bind({})
Default.args = {
  size: 'md',
  type: 'button',
  disabled: false,
  default: 'Default Button',
}
