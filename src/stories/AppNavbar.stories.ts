import type { Meta, StoryFn } from '@storybook/vue3'
import { vueRouter } from 'storybook-vue3-router'

import Navbar from '@/components/navbar/AppNavbar.vue'

export default {
  title: 'Components/AppNavbar',
  component: Navbar,
  argTypes: {
    links: {
      description: 'List of navigation links with `text` and `to` properties',
      control: 'object',
      defaultValue: [
        { text: 'Home', to: '/' },
        { text: 'About', to: '/about' },
        { text: 'Services', to: '/services' },
        { text: 'Contact', to: '/contact' },
      ],
    },
  },
  tags: ['autodocs'],
} as Meta

const Template: StoryFn = (args) => ({
  components: { Navbar },
  setup() {
    return { args }
  },
  template: `
    <Navbar v-bind="args">

    </Navbar>
  `,
})

export const WithCustomLinks = Template.bind({})
WithCustomLinks.args = {
  links: [
    { text: 'Dashboard', to: '/dashboard' },
    { text: 'Profile', to: '/profile' },
    { text: 'Settings', to: '/settings' },
    { text: 'Logout', to: '/logout' },
  ],
}
WithCustomLinks.decorators = [vueRouter()]
