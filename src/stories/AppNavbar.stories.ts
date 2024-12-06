import type { Meta, StoryObj } from '@storybook/vue3'

import AppNavbar from '@/components/navbar/AppNavbar.vue'

export default {
  title: 'Components/AppNavbar',
  component: AppNavbar,
  tags: ['autodocs'], // Activa autodocumentación
  args: {
    title: 'My App',
    links: [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  argTypes: {
    title: {
      description: 'Title displayed in the navbar. Usually the name of the app.',
      control: { type: 'text' },
    },
    links: {
      description: 'Array of navigation links.',
      control: { type: 'object' },
    },
  },
  parameters: {
    docs: {
      autodocs: true, // Habilita autodocumentación
    },
  },
} as Meta<typeof AppNavbar>

type Story = StoryObj<typeof AppNavbar>

// Historia predeterminada
export const Default: Story = {}

// Navbar con menú desplegable
export const OpenMenu: Story = {
  render: (args) => ({
    components: { AppNavbar },
    setup() {
      return { args }
    },
    data() {
      return { isMenuOpen: true }
    },
    template: `
      <AppNavbar v-bind="args" />
    `,
  }),
  args: {
    title: 'Menu Open',
    links: [
      { label: 'Home', href: '/', active: true },
      { label: 'Profile', href: '/profile' },
      { label: 'Settings', href: '/settings' },
    ],
  },
}

// Navbar con enlaces activos
export const ActiveLinks: Story = {
  args: {
    links: [
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Projects', href: '/projects' },
      { label: 'Team', href: '/team' },
    ],
  },
}

// Navbar con logo personalizado
export const WithCustomLogo: Story = {
  render: (args) => ({
    components: { AppNavbar },
    setup() {
      return { args }
    },
    template: `
      <AppNavbar v-bind="args">
        <template #logo>
          <img src="https://via.placeholder.com/100x30" alt="Custom Logo" class="h-8 w-auto" />
        </template>
      </AppNavbar>
    `,
  }),
  args: {
    title: 'Custom Logo',
  },
}

// Navbar con enlaces largos
export const LongLinks: Story = {
  args: {
    links: [
      { label: 'Really Long Link Name', href: '/long-link' },
      { label: 'Another Super Long Link', href: '/another-long-link' },
      { label: 'And Yet Another Long Link', href: '/yet-another-long-link' },
    ],
  },
}

// Navbar vacío
export const Empty: Story = {
  args: {
    title: '',
    links: [],
  },
}
