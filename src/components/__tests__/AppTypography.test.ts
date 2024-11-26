import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Typography from '@/components/typography/AppTypography.vue'

describe('Typography', () => {
  it('renders the default structure correctly', () => {
    const wrapper = mount(Typography, {
      slots: {
        default: 'Default Text',
      },
    })

    const element = wrapper.find('p')
    expect(element.exists()).toBe(true)
    expect(element.text()).toBe('Default Text')
    expect(element.classes()).toContain('text-base')
    expect(element.classes()).toContain('text-left')
    expect(element.classes()).toContain('font-normal')
    expect(element.classes()).toContain('text-zinc-800')
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(Typography, {
      props: { size: 'lg' },
      slots: { default: 'Large Text' },
    })

    const element = wrapper.find('p')
    expect(element.classes()).toContain('text-lg')
  })

  it('applies alignment classes correctly', () => {
    const wrapper = mount(Typography, {
      props: { align: 'center' },
      slots: { default: 'Centered Text' },
    })

    const element = wrapper.find('p')
    expect(element.classes()).toContain('text-center')
  })

  it('applies weight classes correctly', () => {
    const wrapper = mount(Typography, {
      props: { weight: 'bold' },
      slots: { default: 'Bold Text' },
    })

    const element = wrapper.find('p')
    expect(element.classes()).toContain('font-bold')
  })

  it('applies color classes correctly', () => {
    const wrapper = mount(Typography, {
      props: { color: 'red' },
      slots: { default: 'Red Text' },
    })

    const element = wrapper.find('p')
    expect(element.classes()).toContain('text-red-500')
  })

  it('renders custom elements with the "as" prop', () => {
    const wrapper = mount(Typography, {
      props: { as: 'h1' },
      slots: { default: 'Heading 1 Text' },
    })

    const element = wrapper.find('h1')
    expect(element.exists()).toBe(true)
    expect(element.text()).toBe('Heading 1 Text')
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(Typography, {
      slots: { default: '<span class="custom-slot">Custom Slot Content</span>' },
    })

    const slotContent = wrapper.find('.custom-slot')
    expect(slotContent.exists()).toBe(true)
    expect(slotContent.text()).toBe('Custom Slot Content')
  })
})
