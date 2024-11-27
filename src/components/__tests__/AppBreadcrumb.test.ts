import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Breadcrumb from '@/components/breadcrumb/AppBreadcrumb.vue'

describe('Breadcrumb Component', () => {
  const items = [
    { text: 'Home', to: '/' },
    { text: 'Projects', to: '/projects' },
    { text: 'Details' },
  ]

  it('renders all breadcrumb items', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items },
    })

    const breadcrumbItems = wrapper.findAll('li')
    expect(breadcrumbItems).toHaveLength(items.length)

    items.forEach((item, index) => {
      const breadcrumbText = breadcrumbItems[index].text()
      expect(breadcrumbText).toContain(item.text)
    })
  })

  it('renders links for items with a "to" property', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items },
    })

    const links = wrapper.findAll('a')
    expect(links).toHaveLength(items.filter((item) => item.to).length)

    items.forEach((item) => {
      if (item.to) {
        const link = wrapper.find(`a[href="${item.to}"]`)
        expect(link.exists()).toBe(true)
        expect(link.text()).toBe(item.text)
      }
    })
  })

  it('renders span for items without a "to" property', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items },
    })

    const lastItem = wrapper.find('span')
    expect(lastItem.exists()).toBe(true)
    expect(lastItem.text()).toBe(items[items.length - 1].text)
  })

  it('renders ChevronRight icons between breadcrumb items', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items },
    })

    const chevrons = wrapper.findAll('svg.w-4.h-4.text-zinc-400')
    expect(chevrons).toHaveLength(items.length - 1)
  })

  it('applies "aria-current" to the last breadcrumb item', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items },
    })

    const lastItem = wrapper.find('li[aria-current="page"]')
    expect(lastItem.exists()).toBe(true)
    expect(lastItem.text()).toBe(items[items.length - 1].text)
  })

  it('renders HomeIcon only for the first breadcrumb item', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items },
    })

    const homeIcons = wrapper.findAll('[data-test="home-icon"]')
    expect(homeIcons).toHaveLength(1)
    expect(homeIcons[0].element.closest('li')).toBe(wrapper.findAll('li')[0].element)
  })
})
