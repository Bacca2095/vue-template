import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppCard from '../cards/AppCard.vue'

describe('AppCard.vue', () => {
  it('renderiza correctamente con clases base', () => {
    // Arrange
    const wrapper = mount(AppCard)

    // Act
    const card = wrapper.find('div')

    // Assert
    expect(card.exists()).toBe(true)
    expect(card.classes()).toContain('block')
    expect(card.classes()).toContain('p-6')
    expect(card.classes()).toContain('rounded-3xl')
    expect(card.classes()).toContain('shadow-lg')
    expect(card.classes()).toContain('bg-zinc-100')
    expect(card.classes()).toContain('dark:bg-zinc-800')
  })

  it('permite agregar clases personalizadas con "customClass"', () => {
    // Arrange
    const customClass = 'custom-class'
    const wrapper = mount(AppCard, {
      props: { customClass },
    })

    // Act
    const card = wrapper.find('div')

    // Assert
    expect(card.classes()).toContain(customClass)
  })

  it('renderiza contenido en el slot "image"', () => {
    // Arrange
    const slotContent = '<img src="test.jpg" alt="Test Image">'
    const wrapper = mount(AppCard, {
      slots: {
        image: slotContent,
      },
    })

    // Act
    const slot = wrapper.find('img')

    // Assert
    expect(slot.exists()).toBe(true)
    expect(slot.attributes('src')).toBe('test.jpg')
    expect(slot.attributes('alt')).toBe('Test Image')
  })

  it('renderiza contenido en el slot "title"', () => {
    // Arrange
    const slotContent = '<h1>Test Title</h1>'
    const wrapper = mount(AppCard, {
      slots: {
        title: slotContent,
      },
    })

    // Act
    const slot = wrapper.find('h1')

    // Assert
    expect(slot.exists()).toBe(true)
    expect(slot.text()).toBe('Test Title')
  })

  it('renderiza contenido en el slot "content"', () => {
    // Arrange
    const slotContent = '<p>Test Content</p>'
    const wrapper = mount(AppCard, {
      slots: {
        content: slotContent,
      },
    })

    // Act
    const slot = wrapper.find('p')

    // Assert
    expect(slot.exists()).toBe(true)
    expect(slot.text()).toBe('Test Content')
  })

  it('renderiza múltiples slots correctamente', () => {
    // Arrange
    const wrapper = mount(AppCard, {
      slots: {
        image: '<img src="test.jpg" alt="Test Image">',
        title: '<h1>Test Title</h1>',
        content: '<p>Test Content</p>',
      },
    })

    // Act
    const imageSlot = wrapper.find('img')
    const titleSlot = wrapper.find('h1')
    const contentSlot = wrapper.find('p')

    // Assert
    expect(imageSlot.exists()).toBe(true)
    expect(titleSlot.exists()).toBe(true)
    expect(contentSlot.exists()).toBe(true)
    expect(titleSlot.text()).toBe('Test Title')
    expect(contentSlot.text()).toBe('Test Content')
  })
})
