import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppButton from '@/components/buttons/AppButton.vue'

describe('AppButton', () => {
  it('renders the button with default props', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Click Me',
      },
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Click Me')
  })

  it('applies size classes based on props', () => {
    const wrapper = mount(AppButton, {
      props: { size: 'lg' },
      slots: { default: 'Large Button' },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('text-lg')
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
      slots: { default: 'Disabled Button' },
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes()).toContain('opacity-50')
  })

  it('emits a click event when clicked', async () => {
    const wrapper = mount(AppButton, {
      props: { type: 'button', disabled: false },
      slots: { default: 'Clickable Button' },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit a click event when disabled', async () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
      slots: { default: 'Non-clickable Button' },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
