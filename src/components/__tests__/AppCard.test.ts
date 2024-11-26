import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppCard from '@/components/cards/AppCard.vue'

describe('AppCard', () => {
  it('renders the card correctly', () => {
    const wrapper = mount(AppCard)

    const cardWrapper = wrapper.find('.px-4.w-full.md\\:w-1\\/2.lg\\:w-1\\/4')
    expect(cardWrapper.exists()).toBe(true)

    const cardInner = wrapper.find(
      '.bg-white.dark\\:bg-zinc-700.shadow-lg.p-8.rounded-3xl.text-zinc-800.dark\\:text-zinc-300',
    )
    expect(cardInner.exists()).toBe(true)
  })

  it('renders slot content', () => {
    const slotContent = '<p>This is a card</p>'
    const wrapper = mount(AppCard, {
      slots: {
        default: slotContent,
      },
    })

    expect(wrapper.html()).toContain(slotContent)
  })

  it('applies the correct classes for light and dark modes', () => {
    const wrapper = mount(AppCard)

    const cardInner = wrapper.find(
      '.bg-white.dark\\:bg-zinc-700.shadow-lg.p-8.rounded-3xl.text-zinc-800.dark\\:text-zinc-300',
    )

    expect(cardInner.classes()).toContain('bg-white')
    expect(cardInner.classes()).toContain('dark:bg-zinc-700')
    expect(cardInner.classes()).toContain('text-zinc-800')
    expect(cardInner.classes()).toContain('dark:text-zinc-300')
  })
})
