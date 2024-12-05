import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import Button from '../buttons/AppButton.vue'

describe('Button.vue', () => {
  it('renderiza correctamente con propiedades por defecto', () => {
    // Arrange
    const wrapper = mount(Button)

    // Act
    const button = wrapper.find('button')

    // Assert

    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('button')
    expect(button.classes()).toContain('px-3')
    expect(button.classes()).toContain('bg-zinc-700')
  })

  it('aplica las clases correctas según la propiedad "size"', () => {
    const sizes = {
      sm: 'px-3 py-2 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-5 py-2.5 text-sm',
    }

    for (const [size, expectedClass] of Object.entries(sizes)) {
      const wrapper = mount(Button, {
        props: { size: size as 'sm' | 'md' | 'lg' },
      })

      const button = wrapper.find('button')
      const classes = button.classes().join(' ')

      expect(classes).toContain(expectedClass)
    }
  })

  it('emite el evento "click" al hacer clic cuando no está deshabilitado', async () => {
    // Arrange
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { disabled: false },
      attrs: {
        onClick, // Listener para capturar el evento
      },
    })

    const button = wrapper.find('button')

    // Act
    await button.trigger('click')

    // Assert
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('no emite el evento "click" cuando está deshabilitado', async () => {
    // Arrange
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { disabled: true },
      attrs: {
        onClick, // Listener para capturar el evento
      },
    })

    const button = wrapper.find('button')

    // Act
    await button.trigger('click')

    // Assert
    expect(onClick).not.toHaveBeenCalled()
  })

  it('aplica clases de deshabilitado cuando "disabled" es true', () => {
    // Arrange
    const wrapper = mount(Button, {
      props: { disabled: true },
    })

    // Act
    const button = wrapper.find('button')

    // Assert
    expect(button.classes()).toContain('cursor-not-allowed')
    expect(button.classes()).toContain('bg-gray-400')
  })

  it('permite agregar clases personalizadas a través de "customClass"', () => {
    // Arrange
    const customClass = 'custom-class'
    const wrapper = mount(Button, {
      props: { customClass },
    })

    // Act
    const button = wrapper.find('button')

    // Assert
    expect(button.classes()).toContain(customClass)
  })

  it('muestra contenido en el slot', () => {
    // Arrange
    const slotContent = 'Click Me!'
    const wrapper = mount(Button, {
      slots: {
        default: slotContent,
      },
    })

    // Act
    const button = wrapper.find('button')

    // Assert
    expect(button.text()).toBe(slotContent)
  })
})
