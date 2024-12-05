import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppTypography from '@/components/typography/AppTypography.vue'

describe('AppTypography.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(AppTypography, {
      slots: {
        default: 'Texto por defecto',
      },
    })
    expect(wrapper.html()).toContain('<p')
    expect(wrapper.text()).toBe('Texto por defecto')
    expect(wrapper.classes()).toContain('text-base')
    expect(wrapper.classes()).toContain('font-normal')
    expect(wrapper.classes()).toContain('text-zinc-700')
  })

  it('renders with different sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'> = [
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
      '3xl',
    ]

    sizes.forEach((size) => {
      const wrapper = mount(AppTypography, {
        props: { size },
        slots: {
          default: `Texto ${size}`,
        },
      })
      expect(wrapper.classes()).toContain(`text-${size}`)
      expect(wrapper.text()).toBe(`Texto ${size}`)
    })
  })

  it('renders with different text alignments', () => {
    const alignments: Array<'left' | 'center' | 'right' | 'justify'> = [
      'left',
      'center',
      'right',
      'justify',
    ]

    alignments.forEach((align) => {
      const wrapper = mount(AppTypography, {
        props: { align },
        slots: {
          default: `Texto alineado a ${align}`,
        },
      })
      expect(wrapper.classes()).toContain(`text-${align}`)
      expect(wrapper.text()).toBe(`Texto alineado a ${align}`)
    })
  })

  it('renders different HTML elements based on "as" prop', () => {
    const elements: Array<'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'div'> = [
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'span',
      'div',
    ]

    elements.forEach((element) => {
      const slotContent = `Texto en ${element}`
      const wrapper = mount(AppTypography, {
        props: { as: element },
        slots: {
          default: slotContent,
        },
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe(element)

      expect(wrapper.text()).toBe(slotContent)
    })
  })

  it('renders different font weights', () => {
    const weights: Array<'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'> = [
      'normal',
      'medium',
      'semibold',
      'bold',
      'extrabold',
    ]

    weights.forEach((weight) => {
      const wrapper = mount(AppTypography, {
        props: { weight },
        slots: {
          default: `Texto con peso ${weight}`,
        },
      })
      expect(wrapper.classes()).toContain(`font-${weight}`)
      expect(wrapper.text()).toBe(`Texto con peso ${weight}`)
    })
  })

  it('applies invert styles when "invert" prop is true', () => {
    const wrapper = mount(AppTypography, {
      props: { invert: true },
      slots: {
        default: 'Texto invertido',
      },
    })
    expect(wrapper.classes()).toContain('text-zinc-900')
    expect(wrapper.classes()).toContain('dark:text-zinc-100')
  })

  it('applies custom classes', () => {
    const customClass = 'custom-class'
    const wrapper = mount(AppTypography, {
      props: { customClass },
      slots: {
        default: 'Texto con clase personalizada',
      },
    })
    expect(wrapper.classes()).toContain(customClass)
  })
})
