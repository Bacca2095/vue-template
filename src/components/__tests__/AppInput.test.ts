import { mount } from '@vue/test-utils'
import { Form } from 'vee-validate'
import { describe, expect, it } from 'vitest'

import AppInput from '@/components/inputs/AppInput.vue'

describe('AppInput.vue', () => {
  it('renders the input with correct attributes', () => {
    const wrapper = mount(AppInput, {
      global: {
        components: { Form },
      },
      props: {
        name: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        type: 'email',
      },
      parentComponent: {
        template: `
          <Form>
            <AppInput name="email" label="Email Address" placeholder="Enter your email" type="email" />
          </Form>
        `,
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('email')
    expect(input.attributes('placeholder')).toBe('Enter your email')

    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Email Address')
  })

  it('shows error message when validation fails', async () => {
    const wrapper = mount(AppInput, {
      global: {
        components: { Form },
      },
      props: {
        name: 'password',
        label: 'Password',
        error: 'Password is required',
        type: 'password',
      },
      parentComponent: {
        template: `
          <Form>
            <AppInput name="password" label="Password" error="Password is required" type="password" />
          </Form>
        `,
      },
    })

    const errorMessage = wrapper.find('.text-red-500')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('Password')
  })

  it('toggles password visibility', async () => {
    const wrapper = mount(AppInput, {
      global: {
        components: { Form },
      },
      props: {
        name: 'password',
        label: 'Password',
        type: 'password',
      },
      parentComponent: {
        template: `
          <Form>
            <AppInput name="password" label="Password" type="password" />
          </Form>
        `,
      },
    })

    const button = wrapper.find('button[title="Show password"]')
    expect(button.exists()).toBe(true)

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('password')

    await button.trigger('click')
    expect(input.attributes('type')).toBe('text')

    await button.trigger('click')
    expect(input.attributes('type')).toBe('password')
  })

  it('should apply focus styles on input focus', async () => {
    const wrapper = mount(AppInput, {
      global: {
        components: { Form },
      },
      props: {
        name: 'email',
        label: 'Email Address',
        type: 'email',
      },
      parentComponent: {
        template: `
          <Form>
            <AppInput name="email" label="Email Address" type="email" />
          </Form>
        `,
      },
    })

    const input = wrapper.find('input')

    await input.trigger('focus')

    expect(input.classes()).toContain('focus:ring-zinc-800')

    await input.trigger('blur')
    expect(input.classes()).not.toContain('focus:ring-zinc-800')
  })

  it('respects the disabled prop', () => {
    const wrapper = mount(AppInput, {
      global: {
        components: { Form },
      },
      props: {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        disabled: true,
      },
      parentComponent: {
        template: `
          <Form>
            <AppInput name="email" label="Email Address" type="email" disabled />
          </Form>
        `,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })
})
