import { mount } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Navbar from '@/components/navbar/AppNavbar.vue'

describe('Navbar', () => {
  const mockLinks = [
    { text: 'Home', to: '/' },
    { text: 'About', to: '/about' },
    { text: 'Services', to: '/services' },
    { text: 'Contact', to: '/contact' },
  ]

  it('renders the navbar correctly', () => {
    const wrapper = mount(Navbar, {
      props: {
        links: mockLinks,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const navbar = wrapper.find('nav')
    expect(navbar.exists()).toBe(true)

    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links).toHaveLength(mockLinks.length)
    mockLinks.forEach((link, index) => {
      expect(links[index].text()).toBe(link.text)
      expect(links[index].props().to).toBe(link.to)
    })
  })

  it('toggles menu visibility when the button is clicked', async () => {
    const wrapper = mount(Navbar, {
      props: {
        links: mockLinks,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const button = wrapper.find('button[aria-controls="navbar-default"]')
    const menu = wrapper.find('#navbar-default')

    expect(menu.classes()).toContain('hidden')

    await button.trigger('click')

    expect(menu.classes()).not.toContain('hidden')

    await button.trigger('click')

    expect(menu.classes()).toContain('hidden')
  })

  it('renders custom slots correctly', () => {
    const wrapper = mount(Navbar, {
      props: {
        links: mockLinks,
      },
      slots: {
        icon: '<div class="custom-icon">Custom Icon</div>',
        title: '<h1 class="custom-title">Custom Title</h1>',
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const icon = wrapper.find('.custom-icon')
    expect(icon.exists()).toBe(true)
    expect(icon.text()).toBe('Custom Icon')

    const title = wrapper.find('.custom-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Custom Title')
  })
})
