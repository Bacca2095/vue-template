import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Pagination from '@/components/pagination/AppPagination.vue'

describe('Pagination', () => {
  it('renders correctly with provided props', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    expect(wrapper.text()).toContain('Showing 1 - 10 of 50')
    expect(wrapper.findAll('button')).toHaveLength(7) // Previous + 5 pages + Next
  })

  it('emits "pageChange" with correct value when a page is clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const pageButton = wrapper.findAll('button')[2]
    await pageButton.trigger('click')

    expect(wrapper.emitted('pageChange')).toBeTruthy()
    expect(wrapper.emitted('pageChange')?.[0]).toEqual([2])
  })

  it('disables previous button on the first page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const prevButton = wrapper.find('button:disabled')
    expect(prevButton.exists()).toBe(true)
    expect(prevButton.text()).toBe('')
  })

  it('disables next button on the last page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    const nextButton = wrapper.find('button:disabled')
    expect(nextButton.exists()).toBe(true)
    expect(nextButton.text()).toBe('')
  })

  it('renders the correct range of items', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 5,
        totalItems: 50,
        itemsPerPage: 10,
      },
    })

    expect(wrapper.text()).toContain('Showing 11 - 20 of 50')
  })
})
