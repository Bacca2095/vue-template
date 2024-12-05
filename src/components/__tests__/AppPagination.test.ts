import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import Paginator from '../pagination/AppPagination.vue'

describe('Paginator.vue', () => {
  it('renderiza las páginas correctamente', () => {
    // Arrange
    const wrapper = mount(Paginator, {
      props: {
        totalPages: 5,
        modelValue: 1,
      },
    })

    // Act
    const pageButtons = wrapper.findAll('button').filter((button) => {
      const text = button.text()
      return text && !isNaN(Number(text)) // Filtra botones con números
    })

    // Assert
    expect(pageButtons.length).toBe(4) // 5 páginas
    expect(pageButtons[0].text()).toBe('1') // Primera página
    expect(pageButtons[3].text()).toBe('5') // Última página
  })

  it('deshabilita el botón "Página anterior" en la primera página', () => {
    // Arrange
    const wrapper = mount(Paginator, {
      props: {
        totalPages: 5,
        modelValue: 1,
      },
    })

    // Act
    const prevButton = wrapper.find('button[aria-label="Página anterior"]')

    // Assert
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('deshabilita el botón "Página siguiente" en la última página', () => {
    // Arrange
    const wrapper = mount(Paginator, {
      props: {
        totalPages: 5,
        modelValue: 5,
      },
    })

    // Act
    const nextButton = wrapper.find('button[aria-label="Página siguiente"]')

    // Assert
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('muestra las elipsis correctamente cuando hay muchas páginas', () => {
    // Arrange
    const wrapper = mount(Paginator, {
      props: {
        totalPages: 10,
        modelValue: 5,
        maxVisiblePages: 3,
      },
    })

    // Act
    const ellipsis = wrapper.findAll('span')

    // Assert
    expect(ellipsis.length).toBe(2) // Elipsis previa y siguiente
    expect(ellipsis[0].text()).toBe('…')
    expect(ellipsis[1].text()).toBe('…')
  })

  it('navega a la página siguiente correctamente', async () => {
    // Arrange
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(Paginator, {
      props: {
        totalPages: 5,
        modelValue: 1,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    const nextButton = wrapper.find('button[aria-label="Página siguiente"]')

    // Act
    await nextButton.trigger('click')

    // Assert
    expect(onUpdateModelValue).toHaveBeenCalledOnce()
    expect(onUpdateModelValue).toHaveBeenCalledWith(2)
  })

  it('navega a la página anterior correctamente', async () => {
    // Arrange
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(Paginator, {
      props: {
        totalPages: 5,
        modelValue: 3,
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    const prevButton = wrapper.find('button[aria-label="Página anterior"]')

    // Act
    await prevButton.trigger('click')

    // Assert
    expect(onUpdateModelValue).toHaveBeenCalledOnce()
    expect(onUpdateModelValue).toHaveBeenCalledWith(2)
  })
})
