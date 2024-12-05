import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import AppCheckbox from '../inputs/AppCheckbox.vue'

vi.mock('vee-validate', () => ({
  useField: () => ({
    value: ref(false), // Simula el estado del checkbox
    errorMessage: ref('Error Message'), // Mensaje de error simulado
    meta: { valid: false, touched: true }, // Estado simulado de validación
    setTouched: vi.fn(), // Mock para la función `setTouched`
  }),
}))
describe('AppCheckbox.vue', () => {
  it('renderiza correctamente con las propiedades por defecto', () => {
    // Arrange
    const wrapper = mount(AppCheckbox, {
      props: {
        name: 'test-checkbox',
        label: 'Test Label',
      },
    })

    // Act
    const input = wrapper.find('input[type="checkbox"]')
    const label = wrapper.find('label[for]')

    // Assert
    expect(input.exists()).toBe(true)
    expect(label.text()).toBe('Test Label')
    expect(input.attributes('id')).toBeTruthy()
    expect(input.classes()).toContain('peer')
  })

  it('asigna el ID generado automáticamente si no se proporciona uno', () => {
    // Arrange
    const wrapper = mount(AppCheckbox, {
      props: {
        name: 'test-checkbox',
        label: 'Test Label',
      },
    })

    // Act
    const input = wrapper.find('input[type="checkbox"]')

    // Assert
    expect(input.attributes('id')).toMatch(/^checkbox-/)
  })

  it('utiliza el ID proporcionado si existe', () => {
    // Arrange
    const wrapper = mount(AppCheckbox, {
      props: {
        name: 'test-checkbox',
        label: 'Test Label',
        id: 'custom-id',
      },
    })

    // Act
    const input = wrapper.find('input[type="checkbox"]')

    // Assert
    expect(input.attributes('id')).toBe('custom-id')
  })

  it('emite el evento "update:modelValue" cuando cambia su estado', async () => {
    // Arrange
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(AppCheckbox, {
      props: {
        name: 'test-checkbox',
        label: 'Test Label',
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    const input = wrapper.find('input[type="checkbox"]')

    // Act
    await input.setValue(true)

    // Assert
    expect(onUpdateModelValue).toHaveBeenCalledOnce()
    expect(onUpdateModelValue).toHaveBeenCalledWith(true)
  })

  it('muestra un error cuando "hasError" es verdadero', () => {
    // Arrange
    const wrapper = mount(AppCheckbox, {
      props: {
        name: 'test-checkbox',
        label: 'Test Label',
      },
    })

    // Act
    const errorMessage = wrapper.find('.text-red-500')

    // Assert
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('Error Message') // Asegura que el mensaje de error es correcto
  })

  it('no emite eventos si está deshabilitado', async () => {
    // Arrange
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(AppCheckbox, {
      props: {
        name: 'test-checkbox',
        label: 'Test Label',
        disabled: true,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    const input = wrapper.find('input[type="checkbox"]')

    // Act
    await input.trigger('change')

    // Assert
    expect(onUpdateModelValue).not.toHaveBeenCalled()
  })

  it('renderiza contenido del slot por defecto como etiqueta', () => {
    // Arrange
    const wrapper = mount(AppCheckbox, {
      props: { name: 'test-checkbox', label: 'Test Label' },
      slots: {
        default: 'Custom Slot Label',
      },
    })

    // Act
    const label = wrapper.find('label[for]')

    // Assert
    expect(label.text()).toBe('Custom Slot Label')
  })
})
