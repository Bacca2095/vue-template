import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppInput from '@/components/inputs/AppInput.vue'

describe('AppInput', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(AppInput, {
      props: { name: 'test', label: 'Test Label', placeholder: 'Enter value' },
    })

    const input = wrapper.find('input')
    const label = wrapper.find('label')

    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Test Label')

    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Enter value')
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(AppInput, {
      props: { name: 'test', disabled: true },
    })

    const input = wrapper.find('input')

    expect(input.attributes('disabled')).toBeDefined()
    expect(input.classes()).toContain('opacity-50')
    expect(input.classes()).toContain('cursor-not-allowed')
  })

  it('handles focus and blur events', async () => {
    const wrapper = mount(AppInput, {
      props: { name: 'test' },
    })

    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(input.classes()).toContain('focus:ring-zinc-800')

    await input.trigger('blur')
    expect(input.classes()).not.toContain('focus:ring-zinc-800')
  })

  it('toggles password visibility', async () => {
    const wrapper = mount(AppInput, {
      props: { name: 'password', type: 'password' },
    })

    const input = wrapper.find('input')
    const toggleButton = wrapper.find('button')

    expect(input.attributes('type')).toBe('password')

    await toggleButton.trigger('click')

    expect(input.attributes('type')).toBe('text')

    await toggleButton.trigger('click')

    expect(input.attributes('type')).toBe('password')
  })
})
