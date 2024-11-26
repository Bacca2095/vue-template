import type { Meta, StoryFn } from '@storybook/vue3'

import AppLoading from '@/components/AppLoading.vue'

export default {
  title: 'Components/AppLoading',
  component: AppLoading,
  tags: ['autodocs'],
} as Meta<typeof AppLoading>

const Template: StoryFn<typeof AppLoading> = (args, {}) => ({
  components: { AppLoading },
  setup() {
    return { args }
  },
  template: `<AppLoading/>`,
})

export const Default = Template.bind({})
