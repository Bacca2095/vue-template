import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppBreadcrumb from '@/components/breadcrumb/AppBreadcrumb.vue'

describe('AppBreadcrumb.vue', () => {
  it('renders correctly with breadcrumb items', () => {
    const wrapper = mount(AppBreadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/' },
          { text: 'Projects', to: '/projects' },
          { text: 'Details' },
        ],
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    // Verifica que el número de elementos en el breadcrumb sea correcto
    const items = wrapper.findAll('li')
    expect(items).toHaveLength(3)

    // Verifica que el texto de los elementos sea correcto
    expect(items[0].text()).toBe('Home')
    expect(items[1].text()).toBe('Projects')
    expect(items[2].text()).toBe('Details')

    // Verifica que el último elemento no sea un enlace
    const lastItem = items[2].find('a')
    expect(lastItem.exists()).toBe(false)
  })

  it('renders links for items with "to" prop', () => {
    const wrapper = mount(AppBreadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/' },
          { text: 'Projects', to: '/projects' },
          { text: 'Details' },
        ],
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    // Verifica que los enlaces se generen correctamente
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(2)

    // Verifica los enlaces para los elementos
    expect(links[0].text()).toBe('Home')
    expect(links[1].text()).toBe('Projects')
  })

  it('renders HomeIcon only for the first breadcrumb item', () => {
    const wrapper = mount(AppBreadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/' },
          { text: 'Projects', to: '/projects' },
          { text: 'Details' },
        ],
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    // Verifica que solo el primer item tenga el icono HomeIcon
    const homeIcons = wrapper.findAll('svg[data-test="home-icon"]')
    expect(homeIcons).toHaveLength(1)
    expect(homeIcons[0].element.closest('li')).toBe(wrapper.findAll('li')[0].element)
  })

  it('renders ChevronRight between breadcrumb items except the last one', () => {
    const wrapper = mount(AppBreadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/' },
          { text: 'Projects', to: '/projects' },
          { text: 'Details' },
        ],
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    // Verifica los ChevronRight entre los items
    const chevrons = wrapper.findAll('svg.w-4.h-4.text-zinc-400')
    expect(chevrons).toHaveLength(2) // Entre Home > Projects y Projects > Details
  })
})
