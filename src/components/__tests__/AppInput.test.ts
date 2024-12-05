import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import AppInput from '../inputs/AppInput.vue'

vi.mock('vee-validate', () => ({
  useField: () => ({
    value: ref(''), // Simula el valor del campo
    errorMessage: ref('Error Message'), // Mensaje de error simulado
    meta: { valid: false, touched: true }, // Simula estado inválido y "tocado"
    setTouched: vi.fn(), // Mock para setTouched
  }),
}))

describe('AppInput.vue', () => {
  it('renderiza correctamente con las propiedades por defecto', () => {
    // Arrange
    const wrapper = mount(AppInput, {
      props: { name: 'test-input', label: 'Test Label' },
    })

    // Act
    const input = wrapper.find('input')
    const label = wrapper.find('label')

    // Assert
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text') // Tipo por defecto
    expect(label.text()).toBe('Test Label') // Renderiza la etiqueta correctamente
  })

  it('renderiza un mensaje de error cuando "hasError" es verdadero', () => {
    // Arrange
    const wrapper = mount(AppInput, {
      props: { name: 'test-input', label: 'Test Label' },
    })

    // Act
    const errorMessage = wrapper.find('span')

    // Assert
    expect(errorMessage.exists()).toBe(true) // Verifica que el mensaje existe
    expect(errorMessage.text()).toBe('Error Message') // Asegura que el mensaje es correcto
  })

  it('permite alternar la visibilidad de la contraseña', async () => {
    // Arrange
    const wrapper = mount(AppInput, {
      props: { name: 'password-input', type: 'password' },
    })

    const toggleButton = wrapper.find('button')
    const input = wrapper.find('input')

    // Act - Alternar visibilidad
    expect(input.attributes('type')).toBe('password') // Inicialmente tipo contraseña
    await toggleButton.trigger('click')
    expect(input.attributes('type')).toBe('text') // Tipo cambiado a texto
    await toggleButton.trigger('click')
    expect(input.attributes('type')).toBe('password') // Vuelve a contraseña
  })

  it('aplica las clases correctas según el tamaño', () => {
    const sizes = {
      sm: 'p-2 text-xs',
      md: 'p-2.5 text-sm',
      lg: 'p-4 text-base',
    }

    for (const [size, expectedClass] of Object.entries(sizes)) {
      // Arrange
      const wrapper = mount(AppInput, {
        props: { name: 'test-input', size: size as 'sm' | 'md' | 'lg' },
      })

      // Act
      const input = wrapper.find('input')
      const classes = input.classes().join(' ')

      // Assert
      expect(classes).toContain(expectedClass)
    }
  })

  it('aplica las clases de "disabled" cuando está deshabilitado', () => {
    // Arrange
    const wrapper = mount(AppInput, {
      props: { name: 'test-input', disabled: true },
    })

    const input = wrapper.find('input')

    // Assert
    expect(input.classes()).toContain('cursor-not-allowed')
    expect(input.attributes('disabled')).toBeDefined()
  })
})
