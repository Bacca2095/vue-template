import { mount } from '@vue/test-utils'
import { Form } from 'vee-validate'
import { describe, expect, it } from 'vitest'

import AppCheckbox from '@/components/inputs/AppCheckbox.vue'

describe('AppCheckbox.vue', () => {
  it('renders the checkbox with the correct label', () => {
    const wrapper = mount(AppCheckbox, {
      global: {
        components: {
          Form,
        },
      },
      props: {
        label: 'Accept Terms',
        name: 'terms',
      },
      slots: {},
      parentComponent: {
        template: `
          <Form>
            <AppCheckbox label="Accept Terms" name="terms" />
          </Form>
        `,
      },
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Accept Terms')
  })

  it('updates value when checkbox is clicked', async () => {
    const wrapper = mount(AppCheckbox, {
      global: {
        components: {
          Form,
        },
      },
      props: {
        label: 'Accept Terms',
        name: 'terms',
      },
      parentComponent: {
        template: `
          <Form>
            <AppCheckbox label="Accept Terms" name="terms" />
          </Form>
        `,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')

    expect((checkbox.element as HTMLInputElement).checked).toBe(false)

    await checkbox.setValue(true)
    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('respects the disabled prop', () => {
    const wrapper = mount(AppCheckbox, {
      global: {
        components: {
          Form,
        },
      },
      props: {
        label: 'Accept Terms',
        name: 'terms',
        disabled: true,
      },
      parentComponent: {
        template: `
          <Form>
            <AppCheckbox label="Accept Terms" name="terms" disabled />
          </Form>
        `,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')

    expect((checkbox.element as HTMLInputElement).disabled).toBe(true)
  })
})
