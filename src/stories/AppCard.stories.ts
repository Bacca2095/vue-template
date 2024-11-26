import type { Meta, StoryFn } from '@storybook/vue3'

import AppCard from '@/components/cards/AppCard.vue'

export default {
  title: 'Components/AppCard',
  component: AppCard,
  tags: ['autodocs'],
} as Meta<typeof AppCard>

const Template: StoryFn<typeof AppCard> = (args, {}) => ({
  components: { AppCard },
  setup() {
    return { args }
  },
  template: `<AppCard v-bind="args">{{args.default}}</AppCard>`,
})

export const Default = Template.bind({})
Default.args = {
  default: 'Default Card',
}
