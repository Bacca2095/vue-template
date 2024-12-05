import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppNavbar from '../navbar/AppNavbar.vue'

describe('AppNavbar.vue', () => {
  it('renderiza correctamente con el título y los links', () => {
    // Arrange
    const links = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about', active: false },
      { label: 'Contact', href: '/contact', active: false },
    ]
    const wrapper = mount(AppNavbar, {
      props: {
        title: 'My App',
        links,
      },
    })

    // Act
    const title = wrapper.find('span.font-semibold')
    const linkElements = wrapper.findAll('a')

    // Assert
    expect(title.text()).toBe('My App')
    expect(linkElements).toHaveLength(3)
    expect(linkElements[0].text()).toBe('Home')
    expect(linkElements[0].classes()).toContain('bg-zinc-200') // Link activo
  })

  it('abre y cierra el menú móvil al hacer clic en el botón', async () => {
    // Arrange
    const links = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about', active: false },
      { label: 'Contact', href: '/contact', active: false },
    ]
    const wrapper = mount(AppNavbar, {
      props: {
        title: 'My App',
        links,
      },
    })

    const toggleButton = wrapper.find('button[aria-controls="navbar-menu"]')

    // Act - Abrir menú
    await toggleButton.trigger('click')
    let menu = wrapper.find('div.z-50') // Menú móvil
    expect(menu.exists()).toBe(true)

    // Act - Cerrar menú
    await toggleButton.trigger('click')
    menu = wrapper.find('div.z-50')
    expect(menu.exists()).toBe(false)
  })

  it('cierra el menú móvil al hacer clic en un link', async () => {
    // Arrange
    const links = [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about', active: false },
      { label: 'Contact', href: '/contact', active: false },
    ]
    const wrapper = mount(AppNavbar, {
      props: {
        title: 'My App',
        links,
      },
    })

    const toggleButton = wrapper.find('button[aria-controls="navbar-menu"]')

    // Act - Abrir menú
    await toggleButton.trigger('click')
    const link = wrapper.find('div.z-50 a')

    // Act - Hacer clic en un link
    await link.trigger('click')

    // Assert
    const menu = wrapper.find('div.z-50')
    expect(menu.exists()).toBe(false) // Menú debe cerrarse
  })

  it('renderiza el slot "logo" si está presente', () => {
    // Arrange
    const wrapper = mount(AppNavbar, {
      props: {
        title: 'My App',
        links: [],
      },
      slots: {
        logo: '<img src="/logo.png" alt="Logo" />',
      },
    })

    // Act
    const logo = wrapper.find('img')

    // Assert
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toBe('/logo.png')
  })
})
